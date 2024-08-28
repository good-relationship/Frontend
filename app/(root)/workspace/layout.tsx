import { ReactNode } from 'react';

import FloatingInfo from '@/components/chatting/FloatingInfo';
import WithAccessToken from '@/components/hoc/WithAccessToken';
import { WebsocketProvider } from '@/lib/websocket/WebsocketProvider';

const WorkspaceLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<WebsocketProviderWithAccessToken>
			<div className="flex h-full">
				<section className="py-[40px] px-[50px] fixed top-[60px] right-0 w-full sm:w-[calc(100vw-300px)]">
					{children}
				</section>
				<div className="fixed bottom-0 right-[2vw] p-4">
					<FloatingInfo />
				</div>
			</div>
		</WebsocketProviderWithAccessToken>
	);
};

const WebsocketProviderWithAccessToken = WithAccessToken(WebsocketProvider);

export default WorkspaceLayout;
