import MeetingItem from '@/components/meeting/waitingRoom/MeetingItem';
import { RoomList } from '@/models/meeting/entity/meeting';

type ListWaitingRoomTemplateProps = {
	roomList: RoomList;
};

const ListWaitingRoomTemplate = ({ roomList }: ListWaitingRoomTemplateProps) => {
	return (
		<div>
			{roomList.map((room) => {
				return <MeetingItem key={room.roomId} room={room} />;
			})}
		</div>
	);
};

export default ListWaitingRoomTemplate;
