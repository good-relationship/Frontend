'use client';

import { Client } from '@stomp/stompjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getWorkspaceInfo } from '@/apis/workspace';
import MeetingItem from '@/components/meeting/waitingRoom/MeetingItem';
import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { RoomList } from '@/models/meeting/entity/meeting';

const MeetingPage = () => {
	const [roomList, setRoomList] = useState<RoomList>();
	const stompClient = useWebsocket();
	const router = useRouter();

	useEffect(() => {
		const handleConnect = async () => {
			if (!stompClient) {
				return;
			}
			const { workspaceId } = await getWorkspaceInfo();
			subscribeMeetingList.bind(null, stompClient, workspaceId)();
			publishMeetingList.bind(null, stompClient)();
		};

		handleConnect();
	}, [stompClient]);

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

		router.push(`/workspace/meeting/${roomId}`);
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
