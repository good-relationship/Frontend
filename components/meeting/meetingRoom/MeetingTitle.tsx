import { getUserRoomInfo } from '@/apis/user';

const MeetingTitle = async () => {
	const { roomName } = await getUserRoomInfo();
	return <h1 className="typo-Header4 text-Gray-500">{roomName}</h1>;
};

export default MeetingTitle;
