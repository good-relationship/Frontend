'use client';

import { useEffect, useRef } from 'react';

import { useWebsocket } from '@/lib/websocket/WebsocketProvider';

const MeetingRoomPage = ({ params }: { params: { meetingId: string } }) => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const localStreamRef = useRef<MediaStream>();
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
		setLocalStream();
		subscribeOffer();
		subscribeAnswer();
		subscribeIce();
	}, []);

	const subscribeOffer = () => {
		stompClient.subscribe(`/user/queue/offer/${meetingId}`, function (message) {
			const body = JSON.parse(message.body);
			console.log('subscribeOffer', body);
		});
	};

	const subscribeAnswer = () => {
		stompClient.subscribe(`/user/queue/answer/${meetingId}`, function (message) {
			const body = JSON.parse(message.body);
			console.log('subscribeAnswer', body);
		});
	};

	const subscribeIce = () => {
		stompClient.subscribe(`/user/queue/ice/${meetingId}`, function (message) {
			const body = JSON.parse(message.body);
			console.log('subscribeIce', body);
		});
	};

	const publishOffer = (sdpDto) => {
		stompClient.publish({
			destination: `/app/offer/${meetingId}`,
			body: JSON.stringify(sdpDto),
		});
	};

	const publishAnswer = () => {
		stompClient.publish({
			destination: `/app/answer/${meetingId}`,
		});
	};

	const publishIce = (iceDto) => {
		stompClient.publish({
			destination: `/app/ice/${meetingId}`,
			body: JSON.stringify(iceDto),
		});
	};

	return (
		<div>
			회의실 번호 : {params.meetingId}
			<video ref={localVideoRef} autoPlay muted />
		</div>
	);
};

export default MeetingRoomPage;
