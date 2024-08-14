import { ReactNode } from 'react';

import ButtonGroup from '@/components/meeting/meetingRoom/ButtonGroup';
import MeetingTitle from '@/components/meeting/meetingRoom/MeetingTitle';
import { MeetingProvider } from '@/lib/websocket/MeetingProvider';

const MeetingRoomLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<div className="flex flex-col justify-between h-full">
			<MeetingTitle />
			<MeetingProvider>
				{children}
				<ButtonGroup />
			</MeetingProvider>
		</div>
	);
};

export default MeetingRoomLayout;
