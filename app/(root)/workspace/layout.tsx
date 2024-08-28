'use client';

import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

import FloatingInfo from '@/components/chatting/FloatingInfo';
import WithAccessToken from '@/components/hoc/WithAccessToken';
import Sidebar from '@/components/sidebar/Sidebar';
import { WebsocketProvider } from '@/lib/websocket/WebsocketProvider';
import { getMenuButtonState } from '@/stores/atoms/getMenuButton';

const WorkspaceLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	const [isSidebarOpen] = useRecoilState(getMenuButtonState);

	return (
		<WebsocketProviderWithAccessToken>
			<div className="flex h-full">
				<Sidebar />
				<section className={`${isSidebarOpen.isOpen ? 'hidden' : 'block'} py-[40px] px-[50px] w-full sm:block`}>
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
