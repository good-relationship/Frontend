import { useContext } from 'react';

import { MeetingContext } from '@/lib/websocket/MeetingProvider';

export const useMeeting = () => {
	const context = useContext(MeetingContext);
	if (context === undefined) {
		throw new Error('useMeeting must be used within a MeetingProvider');
	}
	return context;
};
