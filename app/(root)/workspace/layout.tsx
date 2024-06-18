import { ReactNode } from 'react';

import FloatingInfo from '@/components/chatting/FloatingInfo';
import Sidebar from '@/components/sidebar/Sidebar';
import { WebsocketProvider } from '@/lib/websocket/WebsocketProvider';

const WorkspaceLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<div className="flex h-full">
			<WebsocketProvider>
				<Sidebar />
				<section className="py-[40px] px-[50px] w-full">{children}</section>
				<div className="fixed bottom-0 right-[2vw] p-4">
					<FloatingInfo />
				</div>
			</WebsocketProvider>
		</div>
	);
};

export default WorkspaceLayout;
