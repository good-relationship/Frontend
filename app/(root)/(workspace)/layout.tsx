import { ReactNode } from 'react';

import FloatingInfo from '@/components/chatting/FloatingInfo';
import Sidebar from '@/components/sidebar/Sidebar';

const WorkspaceLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<div className="flex h-full">
			<Sidebar />
			<section className="p-[72px]">{children}</section>
			<div className="fixed bottom-0 right-10 p-4">
				<FloatingInfo />
			</div>
		</div>
	);
};

export default WorkspaceLayout;
