import Image from 'next/image';

import Nav from '@/components/onboarding/Nav';
import SquareButton from '@/components/SquareButton';

const WorkspaceOverflow = () => {
	// TODO: 기존 워크스페이스 이름 받아오기
	const workspaceName = '조은 사이 워크스페이스';
	const buttonContent = `${workspaceName}(으)로 이동하기`;

	const navInfo = {
		title: '참여중인 워크스페이스가 있습니다.',
		description:
			'조은 사이는 한 개의 워크스페이스만 참여하실 수 있습니다.\n 기존 워크스페이스를 나가고 새로운 워크스페이스에 참여해주세요.',
	};

	return (
		<div className="flex flex-col items-center">
			<Nav title={navInfo.title} description={navInfo.description} />
			<Image src="/images/search_user.png" alt="space" width={280} height={280} />
			<SquareButton variant="Black" size="Small">
				{buttonContent}
			</SquareButton>
		</div>
	);
};

export default WorkspaceOverflow;
