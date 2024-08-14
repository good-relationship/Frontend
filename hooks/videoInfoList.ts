import { useMeeting } from '@/hooks/meeting';
import { VideoInfo } from '@/types/video';

export const useVideoInfoList = () => {
	const { videoInfoList, setVideoInfoList } = useMeeting();
	const addUniqueVideo = (video: VideoInfo) => {
		setVideoInfoList((prev) => {
			return prev.filter((info) => info.userId !== video.userId).concat(video);
		});
	};

	return { videoInfoList, setVideoInfoList, addUniqueVideo };
};
