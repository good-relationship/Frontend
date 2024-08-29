'use client';

import { useState } from 'react';

import IconButton from '@/components/meeting/meetingRoom/IconButton';

const ControlCameraButton = () => {
	const [isCameraOn, setIsCameraOn] = useState(true);
	const icon = isCameraOn ? 'webcam' : 'webcam-off';
	const handleButtonClick = () => {
		setIsCameraOn((prev) => !prev);
	};

	return <IconButton icon={icon} onClick={handleButtonClick} message={isCameraOn ? '카메라 끄기' : '카메라 끄기'} />;
};

export default ControlCameraButton;
