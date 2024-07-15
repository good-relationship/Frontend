'use client';

import { useState } from 'react';

import { getMeetingRoomList } from '@/apis/meeting';
import { getWorkspaceInfo } from '@/apis/workspace';
import EmptyWaitingRoomTemplate from '@/components/meeting/waitingRoom/EmptyWaitingRoomTemplate';
import ListWaitingRoomTemplate from '@/components/meeting/waitingRoom/ListWaitingRoomTemplate';
import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { RoomList } from '@/models/meeting/entity/meeting';

const MeetingRoomList = () => {
	const [roomList, setRoomList] = useState<RoomList>();
	const stompClient = useWebsocket();

	const handleConnect = async () => {
		const { workspaceId } = await getWorkspaceInfo();
		subscribeMeetingList(workspaceId);
		getMeetingRoomList();
	};

	const subscribeMeetingList = (workspaceId: string) => {
		stompClient.subscribe(`/topic/${workspaceId}/meetingRoomList`, function (message) {
			const body = JSON.parse(message.body);
			setRoomList(body.meetingRoomList);
		});
	};

	handleConnect();

	const renderMeetingRoomList = () => {
		if (!roomList || roomList.length === 0) {
			return <EmptyWaitingRoomTemplate />;
		}

		return <ListWaitingRoomTemplate roomList={roomList} />;
	};

	return <section>{renderMeetingRoomList()}</section>;
};

export default MeetingRoomList;
