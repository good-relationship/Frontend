import Image from 'next/image';

const EmptyWaitingRoomTemplate = () => {
	const no_meeting_message = `현재 진행중인 회의가 없습니다.\n새로운 회의를 생성해 팀원과 함께 협업해봐요!`;
	return (
		<div className="flex flex-col items-center">
			<Image src="/images/no_internet.png" width={400} height={400} alt="no_internet" />
			<p className="text-Gray-400 typo-SubHeader2 whitespace-pre-line text-center">{no_meeting_message}</p>
		</div>
	);
};

export default EmptyWaitingRoomTemplate;
