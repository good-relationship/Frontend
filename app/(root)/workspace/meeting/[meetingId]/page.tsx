'use client';

import { useEffect, useRef } from 'react';

const MeetingRoomPage = ({ params }: { params: { meetingId: string } }) => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const localStreamRef = useRef<MediaStream>();
	const setLocalStream = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		localStreamRef.current = stream;
		if (localVideoRef.current) {
			localVideoRef.current.srcObject = stream;
		}
	};

	useEffect(() => {
		setLocalStream();
	}, []);

	return (
		<div>
			회의실 번호 : {params.meetingId}
			<video ref={localVideoRef} autoPlay muted />
		</div>
	);
};

export default MeetingRoomPage;
