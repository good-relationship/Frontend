'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getWorkspaceInfo } from '@/apis/workspace';
import MeetingItem from '@/components/meeting/waitingRoom/MeetingItem';
import { useGetAccessToken } from '@/hooks/auth';
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

	const getMeetingRoomList = async () => {
		const accessToken = await useGetAccessToken();
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meet/room/list`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error('회의 목록 조회 오류');
		}
	};

	const createMeeting = async () => {
		const accessToken = await useGetAccessToken();
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meet/room/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				roomName: '새 회의',
			}),
		});

		if (!response.ok) {
			throw new Error('회의 생성하기 오류');
		}

		const { roomId } = await response.json();

		router.push(`/workspace/meeting/${roomId}`);
	};

	const joinMeeting = async (roomId: string) => {
		const accessToken = await useGetAccessToken();
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meet/room/join/${roomId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error('회의 참여하기 오류');
		}

		router.push(`/workspace/meeting/${roomId}`);
	};

	const exitMeeting = async () => {
		const accessToken = await useGetAccessToken();
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meet/room/leave`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error('회의 나가기 오류');
		}
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
