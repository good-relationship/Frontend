'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createMeeting, getMeetingRoomList, joinMeeting } from '@/apis/meeting';
import { getWorkspaceInfo } from '@/apis/workspace';
import MeetingItem from '@/components/meeting/waitingRoom/MeetingItem';
import RoundedButton from '@/components/RoundedButton';
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
		<div className="w-full">
			<div>
				<h1 className="typo-Header6 text-Gray-400">서울과학기술대학교</h1>
				<h3 className="typo-Header1">워크스페이스 이름</h3>
			</div>
			<hr className="my-3 h-4" />
			<div className="w-full flex justify-between">
				<h6 className="typo-SubHeader1">진행중인 회의</h6>
				<RoundedButton variant="Outline" size="Small" onClick={handleCreateMeeting}>
					새 회의 생성
				</RoundedButton>
			</div>
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
