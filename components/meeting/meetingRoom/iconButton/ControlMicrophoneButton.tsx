'use client';

import { useState } from 'react';

import IconButton from '@/components/meeting/meetingRoom/IconButton';
import { useLocalStream } from '@/hooks/localStream';

const ControlMicrophoneButton = () => {
	const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
	const { toggleMuteMicrophone } = useLocalStream();

	const icon = isMicrophoneOn ? 'microphone' : 'microphone-off';

	const handleButtonClick = () => {
		setIsMicrophoneOn((prev) => !prev);
		toggleMuteMicrophone();
	};

	return (
		<IconButton icon={icon} onClick={handleButtonClick} message={isMicrophoneOn ? '마이크 끄기' : '마이크 켜기'} />
	);
};

export default ControlMicrophoneButton;
