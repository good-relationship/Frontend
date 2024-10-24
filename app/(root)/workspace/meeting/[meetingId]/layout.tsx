import { ReactNode } from 'react';

import { MeetingProvider } from '@/lib/websocket/MeetingProvider';

const MeetingRoomLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<div className="flex flex-col justify-between h-full">
			<MeetingProvider>{children}</MeetingProvider>
		</div>
	);
};

export default MeetingRoomLayout;
