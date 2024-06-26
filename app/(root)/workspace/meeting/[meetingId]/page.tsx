'use client';

import { useEffect } from 'react';

import { getUserInfo, getUserRoomInfo } from '@/apis/user';
import Video from '@/components/meeting/meetingRoom/Video';
import { desktopVideoLayout, mobileVideoLayout } from '@/constants/styles';
import { useLocalStream, usePeerConnections, useVideoInfoList } from '@/hooks/meeting';
import { cn } from '@/lib/utils';
import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { IceDto, SdpDto } from '@/models/meeting/entity/meeting';
import { UserId, UserInfo, UserName } from '@/models/user/entity/user';

const MeetingRoomPage = ({ params }: { params: { meetingId: string } }) => {
	const { localStreamRef, setLocalStream, getLocalStream } = useLocalStream();
	const { peerConnectionsRef } = usePeerConnections();
	const { videoInfoList, setVideoInfoList, addUniqueVideo } = useVideoInfoList();
	const stompClient = useWebsocket();
	const { meetingId } = params;

	const setLocalStreamInfo = async () => {
		const { userId, userName } = await getUserInfo();
		const stream = await getLocalStream();
		setLocalStream(stream);
		addUniqueVideo({
			userName: `${userName} (나)`,
			userId: userId,
			stream: stream,
			isOwner: true,
		});
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
			const { userInfo, sessionDescription } = JSON.parse(message.body);
			const { userId, userName } = userInfo;

			createPeerConnection(userId, userName);
			peerConnectionsRef.current[userId].setRemoteDescription(sessionDescription);

			peerConnectionsRef.current[userId].createAnswer().then((answer) => {
				peerConnectionsRef.current[userId].setLocalDescription(answer);
				publishAnswer({
					sessionDescription: answer,
					userId,
				});
			});
		});
	};

	const subscribeAnswer = () => {
		stompClient.subscribe(`/user/queue/answer/${meetingId}`, async function (message) {
			const { userInfo, sessionDescription } = await JSON.parse(message.body);
			await peerConnectionsRef.current[userInfo.userId].setRemoteDescription(sessionDescription);
		});
	};

	const subscribeIce = () => {
		stompClient.subscribe(`/user/queue/ice/${meetingId}`, function (message) {
			const { userId, candidate, sdpMid, sdpMLineIndex } = JSON.parse(message.body);
			const iceCandidate = new RTCIceCandidate({
				candidate,
				sdpMid,
				sdpMLineIndex,
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
					setVideoInfoList((prev) => prev.filter((info) => info.userId !== convertedUserId));
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
			await setLocalStreamInfo();
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
		<div className="flex flex-wrap justify-center flex-1">
			{videoInfoList.map((info) => (
				<div
					key={info.userId}
					className={cn(
						'p-2',
						desktopVideoLayout[videoInfoList.length - 1],
						mobileVideoLayout[videoInfoList.length - 1],
					)}
				>
					<Video info={info} />
				</div>
			))}
		</div>
	);
};

export default MeetingRoomPage;
