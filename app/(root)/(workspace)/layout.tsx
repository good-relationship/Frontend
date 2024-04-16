import { ReactNode } from 'react';

const WorkspaceLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return <div>{children}</div>;
};

export default WorkspaceLayout;
