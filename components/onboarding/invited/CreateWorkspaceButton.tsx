import Link from 'next/link';

import { URLS } from '@/constants/routings';

const CreateWorkspaceButton = () => {
	return (
		<Link href={URLS.ONBOARDING_CREATE}>
			<span className="typo-Body1 text-Gray-400">새 워크스페이스 생성하기</span>
		</Link>
	);
};

export default CreateWorkspaceButton;
