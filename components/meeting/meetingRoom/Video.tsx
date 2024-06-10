import { useEffect, useRef } from 'react';

const Video = ({ stream }: { stream: MediaStream }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return <video ref={videoRef} autoPlay playsInline className="aspect-video rounded-xl" />;
};

export default Video;
