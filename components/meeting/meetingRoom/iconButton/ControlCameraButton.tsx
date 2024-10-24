'use client';

import { useState } from 'react';

import IconButton from '@/components/meeting/meetingRoom/IconButton';
import { useLocalStream } from '@/hooks/localStream';

const ControlCameraButton = () => {
	const [isCameraOn, setIsCameraOn] = useState(true);
	const { toggleMuteCamera } = useLocalStream();

	const icon = isCameraOn ? 'webcam' : 'webcam-off';

	const handleButtonClick = () => {
		setIsCameraOn((prev) => !prev);
		toggleMuteCamera();
	};

	return <IconButton icon={icon} onClick={handleButtonClick} message={isCameraOn ? '카메라 끄기' : '카메라 켜기'} />;
};

export default ControlCameraButton;
