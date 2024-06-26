'use client';

import { IMessage } from '@stomp/stompjs';
import { useEffect } from 'react';

import { getUserInfo, getUserRoomInfo } from '@/apis/user';
import Video from '@/components/meeting/meetingRoom/Video';
import { desktopVideoLayout, mobileVideoLayout } from '@/constants/styles';
import { useLocalStream, useMeetingWebsocket, usePeerConnections, useVideoInfoList } from '@/hooks/meeting';
import { cn } from '@/lib/utils';
import { UserId, UserInfo, UserName } from '@/models/user/entity/user';

const MeetingRoomPage = ({ params }: { params: { meetingId: string } }) => {
	const { setLocalStream, getLocalStream, addStreamTracksToPeer } = useLocalStream();
	const { peerConnectionsRef } = usePeerConnections();
	const { videoInfoList, setVideoInfoList, addUniqueVideo } = useVideoInfoList();
	const {
		publishOffer,
		publishAnswer,
		publishIce,
		subscribeOffer,
		subscribeAnswer,
		subscribeIce,
		subscribeUserList,
		unsubscribeOffer,
		unsubscribeAnswer,
		unsubscribeIce,
		unsubscribeUserList,
	} = useMeetingWebsocket();
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

	const handleSubscribeOffer = (message: IMessage) => {
		const { userInfo, sessionDescription } = JSON.parse(message.body);
		const { userId, userName } = userInfo;

		createPeerConnection(userId, userName);
		peerConnectionsRef.current[userId].setRemoteDescription(sessionDescription);

		peerConnectionsRef.current[userId].createAnswer().then((answer) => {
			peerConnectionsRef.current[userId].setLocalDescription(answer);
			publishAnswer(
				{
					sessionDescription: answer,
					userId,
				},
				meetingId,
			);
		});
	};

	const handleSubscribeAnswer = async (message: IMessage) => {
		const { userInfo, sessionDescription } = await JSON.parse(message.body);
		await peerConnectionsRef.current[userInfo.userId].setRemoteDescription(sessionDescription);
	};

	const handleSubscribeIc = (message: IMessage) => {
		const { userId, candidate, sdpMid, sdpMLineIndex } = JSON.parse(message.body);
		const iceCandidate = new RTCIceCandidate({
			candidate,
			sdpMid,
			sdpMLineIndex,
		});
		peerConnectionsRef.current[userId].addIceCandidate(iceCandidate);
	};

	const handleSubscribeUserList = (message: IMessage) => {
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
				publishIce(
					{
						candidate: event.candidate.candidate,
						userId: userId,
						sdpMLineIndex: event.candidate.sdpMLineIndex,
						sdpMid: event.candidate.sdpMid,
					},
					meetingId,
				);
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

		addStreamTracksToPeer(peerConnection);

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
				publishOffer(
					{
						sessionDescription: offer,
						userId: member.userId,
					},
					meetingId,
				);
			});
		});
	};

	useEffect(() => {
		const init = async () => {
			await setLocalStreamInfo();
			subscribeOffer(meetingId, handleSubscribeOffer);
			subscribeAnswer(meetingId, handleSubscribeAnswer);
			subscribeIce(meetingId, handleSubscribeIc);
			subscribeUserList(meetingId, handleSubscribeUserList);
			await createPeerConnectionByMembers();
		};

		init();

		return () => {
			unsubscribeOffer(meetingId);
			unsubscribeAnswer(meetingId);
			unsubscribeIce(meetingId);
			unsubscribeUserList(meetingId);
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
