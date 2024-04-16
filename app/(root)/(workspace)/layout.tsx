import { ReactNode } from 'react';

import Sidebar from '@/components/sidebar/Sidebar';

const WorkspaceLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<div className="flex">
			<Sidebar />
			<section className="p-[72px]">{children}</section>
		</div>
	);
};

export default WorkspaceLayout;
