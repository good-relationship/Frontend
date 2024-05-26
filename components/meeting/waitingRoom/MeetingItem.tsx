import { Room } from '@/models/meeting/entity/meeting';

type MeetingItemProps = {
	room: Room;
	joinMeeting: (roomId: string) => void;
};

const MeetingItem = ({ room, joinMeeting }: MeetingItemProps) => {
	const { roomName, userCount, roomId } = room;
	const handleJoinMeeting = () => {
		joinMeeting(roomId);
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
