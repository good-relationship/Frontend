import { ReactNode } from 'react';

import ButtonGroup from '@/components/meeting/meetingRoom/ButtonGroup';
import MeetingTitle from '@/components/meeting/meetingRoom/MeetingTitle';

const MeetingRoomLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<div className="flex flex-col justify-between h-full">
			<MeetingTitle />
			{children}
			<ButtonGroup />
		</div>
	);
};

export default MeetingRoomLayout;
