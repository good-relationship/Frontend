'use client';

import { useEffect, useState } from 'react';

import { getMeetingRoomList } from '@/apis/meeting';
import { getWorkspaceInfo } from '@/apis/workspace';
import EmptyWaitingRoomTemplate from '@/components/meeting/waitingRoom/EmptyWaitingRoomTemplate';
import ListWaitingRoomTemplate from '@/components/meeting/waitingRoom/ListWaitingRoomTemplate';
import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { RoomList } from '@/models/meeting/entity/meeting';

const MeetingRoomList = () => {
	const [roomList, setRoomList] = useState<RoomList>();
	const stompClient = useWebsocket();

	useEffect(() => {
		const handleConnect = async () => {
			const { workspaceId } = await getWorkspaceInfo();
			subscribeMeetingList(workspaceId);
			getMeetingRoomList();
		};

		handleConnect();
	}, []);

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

	return <section>{renderMeetingRoomList()}</section>;
};

export default MeetingRoomList;
