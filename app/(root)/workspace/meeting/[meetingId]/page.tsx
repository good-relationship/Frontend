import ButtonGroup from '@/components/meeting/meetingRoom/ButtonGroup';
import MeetingTitle from '@/components/meeting/meetingRoom/MeetingTitle';
import VideoList from '@/components/meeting/meetingRoom/VideoList';

const MeetingRoomPage = ({ params }: { params: { meetingId: string } }) => {
	return (
		<div className="flex flex-col h-full">
			<MeetingTitle />
			<VideoList meetingId={params.meetingId} />
			<ButtonGroup />
		</div>
	);
};

export default MeetingRoomPage;
