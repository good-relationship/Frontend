'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createMeeting, getMeetingRoomList, joinMeeting } from '@/apis/meeting';
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
			subscribeMeetingList(workspaceId);
			getMeetingRoomList();
		};

		handleConnect();
	}, [stompClient]);

	const subscribeMeetingList = (workspaceId: string) => {
		stompClient.subscribe(`/topic/${workspaceId}/meetingRoomList`, function (message) {
			const body = JSON.parse(message.body);
			setRoomList(body.meetingRoomList);
		});
	};

	const handleCreateMeeting = async () => {
		const { roomId } = await createMeeting({ roomName: '새 회의' });
		router.push(`/workspace/meeting/${roomId}`);
	};

	const handleJoinMeeting = async (roomId: string) => {
		await joinMeeting({ roomId });
		router.push(`/workspace/meeting/${roomId}`);
	};

	return (
		<div>
			여기는 회의 페이지
			<button onClick={handleCreateMeeting}>새 회의 생성</button>
			{roomList && (
				<div>
					{roomList.map((room) => {
						return <MeetingItem key={room.roomId} room={room} joinMeeting={handleJoinMeeting} />;
					})}
				</div>
			)}
		</div>
	);
};

export default MeetingPage;
