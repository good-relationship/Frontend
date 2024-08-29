'use client';

import { useState } from 'react';

import IconButton from '@/components/meeting/meetingRoom/IconButton';
import { usePeerConnections } from '@/hooks/peerConnection';
import { useVideoInfoList } from '@/hooks/videoInfoList';

const ContronScreenButton = () => {
	const [isScreenOn, setIsScreenOn] = useState(true);
	const { addUniqueVideo } = useVideoInfoList();
	const { peerConnectionsRef } = usePeerConnections();

	const icon = isScreenOn ? 'screen' : 'screen-off';
	const handleButtonClick = () => {
		if (isScreenOn) {
			addStreamTracksToPeer();
		} else {
			removeStreamTracksFromPeer();
		}
		toggleScreenMode();
	};

	const toggleScreenMode = () => {
		setIsScreenOn((prev) => !prev);
	};

	const getScreenStream = async () => {
		return await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
	};

	const addStreamTracksToPeer = async () => {
		const screenStream = await getScreenStream();

		addUniqueVideo({
			userName: '화면 공유',
			userId: 123,
			stream: screenStream,
			isOwner: true,
		});

		screenStream.getTracks().forEach((track) => {
			Object.entries(peerConnectionsRef.current).forEach(([, peerConnection]) => {
				peerConnection.addTrack(track, screenStream);
			});
		});
	};

	const removeStreamTracksFromPeer = () => {
		Object.entries(peerConnectionsRef.current).forEach(([, peerConnection]) => {
			peerConnection.getSenders().forEach((sender) => {
				peerConnection.removeTrack(sender);
			});
		});
	};

	return <IconButton icon={icon} onClick={handleButtonClick} />;
};

export default ContronScreenButton;
