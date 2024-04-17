import Image from 'next/image';

import Nav from '@/components/onboarding/Nav';
import SquareButton from '@/components/SquareButton';

const CompleteWorkspaceCreationTemplate = () => {
	// TODO: 워크스페이스 이름 받아오기
	const workspaceName = '조은 사이 워크스페이스';
	const navInfo = {
		title: `${workspaceName}\n 스페이스가 생성되었습니다.`,
		description: '조은 사이와 함께 멋진 프로젝트 완성해보세요!',
	};

	const buttonContent = `${workspaceName}(으)로 이동하기`;

	return (
		<main className="flex flex-col items-center h-full justify-between py-[50px]">
			<Nav title={navInfo.title} description={navInfo.description} />
			<Image src="/images/search_user.png" alt="space" width={210} height={210} />
			<SquareButton variant="Black" size="Small">
				{buttonContent}
			</SquareButton>
		</main>
	);
};

export default CompleteWorkspaceCreationTemplate;
