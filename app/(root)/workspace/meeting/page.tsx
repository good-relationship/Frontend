'use client';

import { useEffect, useState } from 'react';

import { getMeetingRoomList } from '@/apis/meeting';
import { getWorkspaceInfo } from '@/apis/workspace';
import CreateMeetingButton from '@/components/meeting/waitingRoom/CreateMeetingButton';
import EmptyWaitingRoomTemplate from '@/components/meeting/waitingRoom/EmptyWaitingRoomTemplate';
import ListWaitingRoomTemplate from '@/components/meeting/waitingRoom/ListWaitingRoomTemplate';
import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { RoomList } from '@/models/meeting/entity/meeting';

const MeetingPage = () => {
	const [roomList, setRoomList] = useState<RoomList>();
	const stompClient = useWebsocket();

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

	const renderMeetingRoomList = () => {
		if (!roomList || roomList.length === 0) {
			return <EmptyWaitingRoomTemplate />;
		}

		return <ListWaitingRoomTemplate roomList={roomList} />;
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
				<CreateMeetingButton />
			</div>
			{renderMeetingRoomList()}
		</div>
	);
};

export default MeetingPage;
