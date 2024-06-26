'use client';
import { createContext, Dispatch, MutableRefObject, ReactNode, SetStateAction, useRef, useState } from 'react';

import { UserId } from '@/models/user/entity/user';
import { VideoInfoList } from '@/types/video';

type PeerConnections = { [userId: UserId]: RTCPeerConnection };

export const MeetingContext = createContext(
	{} as {
		localStreamRef: MutableRefObject<MediaStream | undefined>;
		peerConnectionsRef: MutableRefObject<PeerConnections>;
		videoInfoList: VideoInfoList;
		setVideoInfoList: Dispatch<SetStateAction<VideoInfoList>>;
	},
);

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
