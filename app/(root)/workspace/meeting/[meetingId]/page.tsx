'use client';

import { useEffect, useRef, useState } from 'react';

import { getUserInfo, getUserRoomInfo } from '@/apis/user';
import Video from '@/components/meeting/meetingRoom/Video';
import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { IceDto, SdpDto } from '@/models/meeting/entity/meeting';
import { UserId, UserInfo } from '@/models/user/entity/user';

const MeetingRoomPage = ({ params }: { params: { meetingId: string } }) => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const localStreamRef = useRef<MediaStream>();
	const peerConnectionsRef = useRef<{ [userId: string]: RTCPeerConnection }>({});
	const [remoteStream, setRemoteStream] = useState<MediaStream[]>([]);
	const stompClient = useWebsocket();
	const { meetingId } = params;

	const setLocalStream = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		localStreamRef.current = stream;
		if (localVideoRef.current) {
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

	const createPeerConnection = (userId: UserId) => {
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
			setRemoteStream((prev) => [...prev, event.streams[0]]);
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
			if (member.userId === userId) {
				return;
			}

			createPeerConnection(member.userId);
			peerConnectionsRef.current[member.userId].createOffer().then((offer) => {
				peerConnectionsRef.current[member.userId].setLocalDescription(offer);
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

	return (
		<div>
			회의실 번호 : {params.meetingId}
			<video ref={localVideoRef} autoPlay muted />
			{remoteStream.map((stream, index) => (
				<Video key={index} stream={stream} />
			))}
		</div>
	);
};

export default MeetingRoomPage;
