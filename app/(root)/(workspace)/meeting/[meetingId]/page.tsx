const MeetingRoomPage = ({ params }: { params: { meetingId: string } }) => {
	return <div>{params.meetingId}</div>;
};

export default MeetingRoomPage;
