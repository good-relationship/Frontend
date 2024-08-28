import CreateMeetingButton from '@/components/meeting/waitingRoom/CreateMeetingButton';
import MeetingRoomList from '@/components/meeting/waitingRoom/MeetingRoomList';

const MeetingPage = () => {
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
			<MeetingRoomList />
		</div>
	);
};

export default MeetingPage;
