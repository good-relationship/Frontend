const MeetingRoomPage = ({ params }: { params: { meetingId: string } }) => {
	return <div>회의실 번호 : {params.meetingId}</div>;
};

export default MeetingRoomPage;
