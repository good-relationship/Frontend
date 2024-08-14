'use client';

import { ReactNode } from 'react';

import ControlCameraButton from '@/components/meeting/meetingRoom/iconButton/ControlCameraButton';
import ControlMicrophoneButton from '@/components/meeting/meetingRoom/iconButton/ControlMicrophoneButton';
import ControlScreenButton from '@/components/meeting/meetingRoom/iconButton/ControlScreenButton';
import ExitMeetingButton from '@/components/meeting/meetingRoom/iconButton/ExitMeetingButton';
import OpenDocumentButton from '@/components/meeting/meetingRoom/iconButton/OpenDocumentButton';
import OpenWhiteBoardButton from '@/components/meeting/meetingRoom/iconButton/OpenWhiteBoradButton';

const ButtonGroup = () => {
	const iconButtons: ReactNode[] = [
		<ControlCameraButton key="camera" />,
		<ControlMicrophoneButton key="microphone" />,
		<ControlScreenButton key="screen" />,
		<OpenDocumentButton key="document" />,
		<OpenWhiteBoardButton key="whiteboard" />,
		<ExitMeetingButton key="exit" />,
	];

	return (
		<section className="w-full flex justify-center gap-5">{iconButtons.map((iconButton) => iconButton)}</section>
	);
};

export default ButtonGroup;
