'use client';
import { createContext, MutableRefObject, ReactNode, useContext, useRef } from 'react';

const MeetingContext = createContext(
	{} as {
		localStreamRef: MutableRefObject<MediaStream | undefined>;
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

	return (
		<MeetingContext.Provider
			value={{
				localStreamRef,
			}}
		>
			{children}
		</MeetingContext.Provider>
	);
};
