'use client';

import { useEffect, useRef, useState } from 'react';

import { getUserInfo, getUserRoomInfo } from '@/apis/user';
import Video from '@/components/meeting/meetingRoom/Video';
import { cn } from '@/lib/utils';
import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { IceDto, SdpDto } from '@/models/meeting/entity/meeting';
import { UserId, UserInfo, UserName } from '@/models/user/entity/user';
import { VideoInfo } from '@/types/video';

const MeetingRoomPage = ({ params }: { params: { meetingId: string } }) => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const localStreamRef = useRef<MediaStream>();
	const peerConnectionsRef = useRef<{ [userId: string]: RTCPeerConnection }>({});
	const [remoteStream, setRemoteStream] = useState<VideoInfo[]>([]);
	const stompClient = useWebsocket();
	const { meetingId } = params;

	const isUserExist = (userId: UserId) => {
		return remoteStream.some((info) => info.userId === userId);
	};

	const addUniqueVideo = (video: VideoInfo) => {
		setRemoteStream((prev) => {
			if (prev.some((info) => info.userId === video.userId)) {
				return prev;
			}
			return [...prev, video];
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

	useEffect(() => {
		const init = async () => {
			await setLocalStream();
			subscribeOffer();
			subscribeAnswer();
			subscribeIce();
			await createPeerConnectionByMembers();
		};
		init();
	}, []);

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
			const userId = body.userId;

			createPeerConnection(userId);
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
			await peerConnectionsRef.current[body.userId].setRemoteDescription(body.sessionDescription);
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

	const desktopFlexBasisStyle = [
		'md:basis-full',
		'md:basis-1/2',
		'md:basis-1/2',
		'md:basis-1/2',
		'md:basis-1/3',
		'md:basis-1/3',
		'md:basis-1/4',
		'md:basis-1/4',
	];
	const mobileFlexBasisStyle = [
		'basis-full',
		'basis-full',
		'basis-full',
		'basis-1/2',
		'basis-1/2',
		'basis-1/2',
		'basis-1/2',
		'basis-1/2',
	];

	return (
		<div className="flex flex-wrap w-full justify-center flex-1">
			{remoteStream.map((info, index) => (
				<div
					className={cn(
						'p-2 w-full',
						desktopFlexBasisStyle[remoteStream.length - 1],
						mobileFlexBasisStyle[remoteStream.length - 1],
					)}
				>
					<Video key={index} info={info} />
				</div>
			))}
		</div>
	);
};

export default MeetingRoomPage;
