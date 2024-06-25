'use client';
import {
	createContext,
	Dispatch,
	MutableRefObject,
	ReactNode,
	SetStateAction,
	useContext,
	useRef,
	useState,
} from 'react';

import { UserId } from '@/models/user/entity/user';
import { VideoInfoList } from '@/types/video';

type PeerConnections = { [userId: UserId]: RTCPeerConnection };

const MeetingContext = createContext(
	{} as {
		localStreamRef: MutableRefObject<MediaStream | undefined>;
		peerConnectionsRef: MutableRefObject<PeerConnections>;
		videoInfoList: VideoInfoList;
		setVideoInfoList: Dispatch<SetStateAction<VideoInfoList>>;
	},
);

export const useMeeting = () => {
	const context = useContext(MeetingContext);
	if (context === undefined) {
		throw new Error('useMeeting must be used within a MeetingProvider');
	}
	return context;
};

export const MeetingProvider = ({ children }: { children: ReactNode }) => {
	const localStreamRef = useRef<MediaStream>();
	const peerConnectionsRef = useRef<PeerConnections>({});
	const [videoInfoList, setVideoInfoList] = useState<VideoInfoList>([]);

	return (
		<MeetingContext.Provider
			value={{
				localStreamRef,
				peerConnectionsRef,
				videoInfoList,
				setVideoInfoList,
			}}
		>
			{children}
		</MeetingContext.Provider>
	);
};
