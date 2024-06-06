'use client';

import { useRouter } from 'next/navigation';

import { joinMeeting } from '@/apis/meeting';
import { Room } from '@/models/meeting/entity/meeting';

type MeetingItemProps = {
	room: Room;
};

const MeetingItem = ({ room }: MeetingItemProps) => {
	const router = useRouter();
	const { roomName, userCount, roomId } = room;

	const handleJoinMeeting = async () => {
		await joinMeeting({ roomId });
		router.push(`/workspace/meeting/${roomId}`);
	};

	return (
		<div>
			<h6>{roomName}</h6>
			<div>
				<span>{userCount}</span>
			</div>
			<button onClick={handleJoinMeeting}>참여</button>
		</div>
	);
};

export default MeetingItem;
