'use client';

import Stomp, { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

import { getWorkspaceInfo } from '@/apis/workspace';
import MeetingItem from '@/components/meeting/waitingRoom/MeetingItem';
import { useGetAccessToken } from '@/hooks/auth';
import { RoomList } from '@/models/meeting/entity/meeting';

const MeetingPage = () => {
	const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
	const [roomList, setRoomList] = useState<RoomList>();
	useEffect(() => {
		const subscribeMeetingList = async () => {
			try {
				const access = await useGetAccessToken();
				const { workspaceId } = await getWorkspaceInfo();
				const client = new Client({
					brokerURL: 'ws://localhost:8080/ws-chat',
					connectHeaders: {
						Authorization: `${access}`,
					},
					reconnectDelay: 5000,
					heartbeatIncoming: 4000,
					heartbeatOutgoing: 4000,
					onStompError: (frame) => {
						console.error('Broker reported error: ' + frame.headers['message']);
						console.error('Additional details: ' + frame.body);
					},
					onConnect: () => {
						client.subscribe(`/topic/${workspaceId}/meetingRoomList`, function (message) {
							const body = JSON.parse(message.body);
							setRoomList(body.meetingRoomList);
							console.log(body.meetingRoomList);
						});
						client.publish({
							destination: '/app/room/list',
						});
					},
				});
				setStompClient(client);
				client.activate();
			} catch (e) {
				console.error(e);
			}
		};

		subscribeMeetingList();

		return () => {
			if (stompClient && stompClient.connected) {
				stompClient.deactivate();
			}
		};
	}, []);

	const createMeeting = () => {
		if (!stompClient || !stompClient.connected) {
			return;
		}

		stompClient.publish({
			destination: `/app/room/create`,
			body: JSON.stringify({
				roomName: 'test',
			}),
		});
	};

	const joinMeeting = (roomId: string) => {
		if (!stompClient || !stompClient.connected) {
			return;
		}

		stompClient.publish({
			destination: `/app/room/join/${roomId}`,
		});

		stompClient.subscribe(`/user/queue/join`, (message) => {
			console.log(message.body);
		});
	};

	const exitMeeting = () => {
		if (!stompClient || !stompClient.connected) {
			return;
		}

		stompClient.publish({
			destination: `/app/room/leave`,
		});
	};

	return (
		<div>
			여기는 회의 페이지
			<button onClick={createMeeting}>새 회의 생성</button>
			<button onClick={exitMeeting}>회의 나가기</button>
			{roomList && (
				<div>
					{roomList.map((room) => {
						return <MeetingItem key={room.roomId} room={room} joinMeeting={joinMeeting} />;
					})}
				</div>
			)}
		</div>
	);
};

export default MeetingPage;
