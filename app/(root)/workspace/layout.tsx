import { ReactNode } from 'react';

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
				<section className="p-[72px]">{children}</section>
			</WebsocketProvider>
		</div>
	);
};

export default WorkspaceLayout;
