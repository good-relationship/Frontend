import { ReactNode } from 'react';

import FloatingInfo from '@/components/chatting/FloatingInfo';
import Sidebar from '@/components/sidebar/Sidebar';
import { WebsocketProvider } from '@/lib/websocket/WebsocketProvider';
import WithAccessToken from '@/lib/websocket/WithAccessToken';

const WorkspaceLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<WebsocketProviderWithAccessToken>
			<div className="flex h-full">
				<Sidebar />
				<section className="p-[72px] w-full">{children}</section>
				<div className="fixed bottom-0 right-10 p-4">
					<FloatingInfo />
				</div>
			</div>
		</WebsocketProviderWithAccessToken>
	);
};

const WebsocketProviderWithAccessToken = WithAccessToken(WebsocketProvider);

export default WorkspaceLayout;
