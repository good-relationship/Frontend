'use client';
import { createContext, MutableRefObject, ReactNode, useContext, useRef } from 'react';

import { UserId } from '@/models/user/entity/user';

type PeerConnections = { [userId: UserId]: RTCPeerConnection };

const MeetingContext = createContext(
	{} as {
		localStreamRef: MutableRefObject<MediaStream | undefined>;
		peerConnectionsRef: MutableRefObject<PeerConnections>;
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

	return (
		<MeetingContext.Provider
			value={{
				localStreamRef,
				peerConnectionsRef,
			}}
		>
			{children}
		</MeetingContext.Provider>
	);
};
