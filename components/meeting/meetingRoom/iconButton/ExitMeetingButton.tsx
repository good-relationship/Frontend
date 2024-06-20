'use client';

import { useRouter } from 'next/navigation';

import { leaveMeeting } from '@/apis/meeting';
import IconButton from '@/components/meeting/meetingRoom/IconButton';

const ExitMeetingButton = () => {
	const router = useRouter();

	const icon = 'exit';
	const handleButtonClick = () => {
		leaveMeeting();
		router.push('/workspace/meeting');
	};

	return <IconButton icon={icon} onClick={handleButtonClick} />;
};

export default ExitMeetingButton;
