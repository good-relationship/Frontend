import Image from 'next/image';

import Nav from '@/components/onboarding/Nav';
import NavigationButton from '@/components/onboarding/overflow/NavigationButton';

const WorkspaceOverflow = () => {
	const navInfo = {
		title: '참여중인 워크스페이스가 있습니다.',
		description:
			'조은 사이는 한 개의 워크스페이스만 참여하실 수 있습니다.\n 기존 워크스페이스를 나가고 새로운 워크스페이스에 참여해주세요.',
	};

	return (
		<div className="flex-col-template">
			<Nav title={navInfo.title} description={navInfo.description} />
			<Image src="/images/search_user.png" alt="space" width={210} height={210} />
			<NavigationButton />
		</div>
	);
};

export default WorkspaceOverflow;
