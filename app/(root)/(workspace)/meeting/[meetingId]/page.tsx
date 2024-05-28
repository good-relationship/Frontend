'use client';

import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';

import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { JoinMeetingRoomResponseDTO } from '@/models/meeting/response/joinMeetingRoomResponseDTO';

const MeetingRoomPage = ({ params }: { params: { meetingId: string } }) => {
	const stompClient = useWebsocket();
	const [roomInfo, setRoomInfo] = useState<JoinMeetingRoomResponseDTO>();
	const localVideoRef = useRef<HTMLVideoElement>(null);
	params;

	useEffect(() => {
		const handleJoin = async () => {
			if (!stompClient) {
				return;
			}

			joinMeeting.bind(null, stompClient)();
		};

		handleJoin();
		getMediaStream();
	}, [stompClient]);

	const joinMeeting = (client: Client) => {
		client.subscribe('/user/queue/join', (message) => {
			const joinedRoomInfo = JSON.parse(message.body);
			setRoomInfo(joinedRoomInfo);
		});
	};

	const getMediaStream = () => {
		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: true,
			})
			.then((stream) => {
				if (localVideoRef.current) {
					localVideoRef.current.srcObject = stream;
				}
			});
	};

	return (
		<>
			<video autoPlay playsInline ref={localVideoRef} />
			{roomInfo?.userInfoList.map((userInfo) => (
				<div key={userInfo.userId}>
					<p>{userInfo.userId}</p>
					<p>{userInfo.userName}</p>
				</div>
			))}
		</>
	);
};

export default MeetingRoomPage;
