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
		const initialize = async () => {
			try {
				const access = await useGetAccessToken();
				const { workspaceId } = await getWorkspaceInfo();

				const handleConnect = (client: Client) => {
					subscribeMeetingList.bind(null, client, workspaceId)();
					publishMeetingList.bind(null, client)();
				};

				const client = new Client({
					brokerURL: 'ws://localhost:8080/ws-chat',
					connectHeaders: {
						Authorization: `${access}`,
					},
					reconnectDelay: 5000,
					heartbeatIncoming: 4000,
					heartbeatOutgoing: 4000,
					onStompError: (frame) => {
						// TODO: stomp 오류 처리
						console.error('Broker reported error: ' + frame.headers['message']);
						console.error('Additional details: ' + frame.body);
					},
					onConnect: () => handleConnect(client),
				});
				setStompClient(client);
				client.activate();
			} catch (e) {
				console.error(e);
			}
		};

		initialize();

		return () => {
			if (stompClient && stompClient.connected) {
				stompClient.deactivate();
			}
		};
	}, []);

	const subscribeMeetingList = (client: Client, workspaceId: string) => {
		client.subscribe(`/topic/${workspaceId}/meetingRoomList`, function (message) {
			const body = JSON.parse(message.body);
			setRoomList(body.meetingRoomList);
		});
	};

	const publishMeetingList = (client: Client) => {
		client.publish({
			destination: '/app/room/list',
		});
	};

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

		stompClient.subscribe(`/user/queue/join`, () => {
			//TODO: meeting 페이지로 연결
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
