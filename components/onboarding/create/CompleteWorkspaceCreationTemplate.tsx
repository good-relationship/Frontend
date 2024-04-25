'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Nav from '@/components/onboarding/Nav';
import SquareButton from '@/components/SquareButton';
import { useCompleteOnboarding } from '@/hooks/onboarding';

const CompleteWorkspaceCreationTemplate = () => {
	const { getWorkspaceName } = useCompleteOnboarding();
	const workspaceName = getWorkspaceName();
	const route = useRouter();

	const navInfo = {
		title: `${workspaceName}\n 스페이스가 생성되었습니다.`,
		description: '조은 사이와 함께 멋진 프로젝트 완성해보세요!',
	};

	const buttonContent = `${workspaceName}(으)로 이동하기`;

	const handleClickNavigate = () => {
		route.push(`/document`);
	};

	return (
		<main className="flex-col-template">
			<Nav title={navInfo.title} description={navInfo.description} />
			<Image src="/images/search_user.png" alt="space" width={210} height={210} />
			<SquareButton variant="Black" size="Small" onClick={handleClickNavigate}>
				{buttonContent}
			</SquareButton>
		</main>
	);
};

export default CompleteWorkspaceCreationTemplate;
