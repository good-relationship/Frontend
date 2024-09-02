import { useEffect, useRef } from 'react';

import { VideoInfo } from '@/types/video';

const Video = ({ info }: { info: VideoInfo }) => {
	const { stream, userName } = info;
	const videoRef = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<div className="w-full h-full relative group">
			<video
				ref={videoRef}
				autoPlay
				playsInline
				className="w-full h-full object-cover rounded-xl"
				controls
				onClick={(e) => {
					e.preventDefault();
					e.currentTarget.requestFullscreen();
				}}
			/>
			<span className="absolute bottom-1 group-hover:hidden right-1 bg-Gray-400 text-Gray-100 px-2 rounded-xl opacity-75">
				{userName}
			</span>
		</div>
	);
};

export default Video;
