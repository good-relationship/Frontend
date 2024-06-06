import Link from 'next/link';
import React from 'react';

import { getWorkspaceInfo } from '@/apis/workspace';
import SquareButton from '@/components/SquareButton';
import { ROUTES } from '@/constants/url';

const NavigationButton = async () => {
	const { workspaceName } = await getWorkspaceInfo();
	const buttonContent = `${workspaceName}(으)로 이동하기`;

	return (
		<Link href={ROUTES.WORKSPACE}>
			<SquareButton variant="Black" size="Medium1">
				{buttonContent}
			</SquareButton>
		</Link>
	);
};

export default NavigationButton;
