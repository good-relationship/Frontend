'use client';

import { useState } from 'react';

import IconButton from '@/components/meeting/meetingRoom/IconButton';

const ControlMicrophoneButton = () => {
	const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
	const icon = isMicrophoneOn ? 'microphone' : 'microphone-off';
	const handleButtonClick = () => {
		setIsMicrophoneOn((prev) => !prev);
	};

	return <IconButton icon={icon} onClick={handleButtonClick} />;
};

export default ControlMicrophoneButton;
