'use client';

import { useEffect, useRef, useState } from 'react';

import { getUserInfo, getUserRoomInfo } from '@/apis/user';
import Video from '@/components/meeting/meetingRoom/Video';
import { desktopVideoLayout, mobileVideoLayout } from '@/constants/styles';
import { cn } from '@/lib/utils';
import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { IceDto, SdpDto } from '@/models/meeting/entity/meeting';
import { UserId, UserInfo, UserName } from '@/models/user/entity/user';
import { VideoInfo } from '@/types/video';

const MeetingRoomPage = ({ params }: { params: { meetingId: string } }) => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const localStreamRef = useRef<MediaStream>();
	const peerConnectionsRef = useRef<{ [userId: UserId]: RTCPeerConnection }>({});
	const [remoteStream, setRemoteStream] = useState<VideoInfo[]>([]);
	const stompClient = useWebsocket();
	const { meetingId } = params;

	const isUserExist = (userId: UserId) => {
		return remoteStream.some((info) => info.userId === userId);
	};

	const addUniqueVideo = (video: VideoInfo) => {
		setRemoteStream((prev) => {
			return prev.filter((info) => info.userId !== video.userId).concat(video);
		});
	};

	const setLocalStream = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		const { userId, userName } = await getUserInfo();
		localStreamRef.current = stream;
		addUniqueVideo({
			userName: `${userName} (나)`,
			userId: userId,
			stream: stream,
			isOwner: true,
		});
		if (localVideoRef.current && !isUserExist(userId)) {
			localVideoRef.current.srcObject = stream;
		}
	};

	const createPeerConnection = (userId: UserId, userName?: UserName) => {
		const peerConnection = new RTCPeerConnection({
			iceServers: [
				{
					urls: 'stun:stun.l.google.com:19302',
				},
			],
		});

		peerConnection.onicecandidate = (event) => {
			if (event.candidate) {
				publishIce({
					candidate: event.candidate.candidate,
					userId: userId,
					sdpMLineIndex: event.candidate.sdpMLineIndex,
					sdpMid: event.candidate.sdpMid,
				});
			}
		};
		peerConnection.ontrack = (event) => {
			addUniqueVideo({
				userId: userId,
				stream: event.streams[0],
				isOwner: false,
				userName: userName || '익명의 유저',
			});
		};

		if (!localStreamRef.current) {
			return;
		}

		localStreamRef.current.getTracks().forEach((track) => {
			if (!localStreamRef.current) {
				return;
			}
			peerConnection.addTrack(track, localStreamRef.current);
		});

		peerConnectionsRef.current[userId] = peerConnection;
	};

	const createPeerConnectionByMembers = async () => {
		const { members } = await getUserRoomInfo();
		const { userId } = await getUserInfo();
		if (members.length === 1) {
			return;
		}

		members.forEach((member: UserInfo) => {
			const { userId: memberId, userName: memberName } = member;
			if (memberId === userId) {
				return;
			}

			createPeerConnection(memberId, memberName);
			peerConnectionsRef.current[memberId].createOffer().then((offer) => {
				peerConnectionsRef.current[memberId].setLocalDescription(offer);
				publishOffer({
					sessionDescription: offer,
					userId: member.userId,
				});
			});
		});
	};

	const subscribeOffer = () => {
		stompClient.subscribe(`/user/queue/offer/${meetingId}`, function (message) {
			const body = JSON.parse(message.body);
			const userId = body.userInfo.userId;
			const userName = body.userInfo.userName;

			createPeerConnection(userId, userName);
			peerConnectionsRef.current[userId].setRemoteDescription(body.sessionDescription);

			peerConnectionsRef.current[userId].createAnswer().then((answer) => {
				peerConnectionsRef.current[userId].setLocalDescription(answer);
				publishAnswer({
					sessionDescription: answer,
					userId: userId,
				});
			});
		});
	};

	const subscribeAnswer = () => {
		stompClient.subscribe(`/user/queue/answer/${meetingId}`, async function (message) {
			const body = await JSON.parse(message.body);
			await peerConnectionsRef.current[body.userInfo.userId].setRemoteDescription(body.sessionDescription);
		});
	};

	const subscribeIce = () => {
		stompClient.subscribe(`/user/queue/ice/${meetingId}`, function (message) {
			const body = JSON.parse(message.body);
			const userId = body.userId;
			const candidate = body.candidate;
			const sdpMid = body.sdpMid;
			const sdpMLineIndex = body.sdpMLineIndex;
			const iceCandidate = new RTCIceCandidate({
				candidate: candidate,
				sdpMid: sdpMid,
				sdpMLineIndex: sdpMLineIndex,
			});
			peerConnectionsRef.current[userId].addIceCandidate(iceCandidate);
		});
	};

	const subscribeUserList = () => {
		stompClient.subscribe(`/topic/meetingRoom/${meetingId}/users`, (message) => {
			const members = JSON.parse(message.body);
			const userIds = members.map((info: UserInfo) => info.userId);
			Object.keys(peerConnectionsRef.current).forEach((userId) => {
				const convertedUserId = parseInt(userId);
				if (!userIds.includes(convertedUserId)) {
					setRemoteStream((prev) => prev.filter((info) => info.userId !== convertedUserId));
					peerConnectionsRef.current[convertedUserId].close();
					delete peerConnectionsRef.current[convertedUserId];
				}
			});
		});
	};

	const publishOffer = (sdpDto: SdpDto) => {
		stompClient.publish({
			destination: `/app/offer/${meetingId}`,
			body: JSON.stringify(sdpDto),
		});
	};

	const publishAnswer = (answer: SdpDto) => {
		stompClient.publish({
			destination: `/app/answer/${meetingId}`,
			body: JSON.stringify(answer),
		});
	};

	const publishIce = (iceDto: IceDto) => {
		stompClient.publish({
			destination: `/app/ice/${meetingId}`,
			body: JSON.stringify(iceDto),
		});
	};

	useEffect(() => {
		const init = async () => {
			await setLocalStream();
			subscribeOffer();
			subscribeAnswer();
			subscribeIce();
			subscribeUserList();
			await createPeerConnectionByMembers();
		};

		init();

		return () => {
			stompClient.unsubscribe(`/user/queue/offer/${meetingId}`);
			stompClient.unsubscribe(`/user/queue/answer/${meetingId}`);
			stompClient.unsubscribe(`/user/queue/ice/${meetingId}`);
			stompClient.unsubscribe(`/topic/meetingRoom/${meetingId}/users`);
		};
	}, []);

	return (
		<div className="flex flex-wrap w-full justify-center flex-1">
			{remoteStream.map((info) => (
				<div
					key={info.userId}
					className={cn(
						'p-2 w-full',
						desktopVideoLayout[remoteStream.length - 1],
						mobileVideoLayout[remoteStream.length - 1],
					)}
				>
					<Video info={info} />
				</div>
			))}
		</div>
	);
};

export default MeetingRoomPage;
