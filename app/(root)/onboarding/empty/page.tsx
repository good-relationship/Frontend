import Image from 'next/image';

import Nav from '@/components/onboarding/Nav';
import SquareButton from '@/components/SquareButton';

const NoWorkspace = () => {
	const navInfo = {
		title: '소속된 워크스페이스가 없습니다.',
		description: '워크스페이스를 만들고 팀원을 초대해보세요!',
	};

	return (
		<div className="flex flex-col items-center">
			<Nav title={navInfo.title} description={navInfo.description} />
			<Image src="/images/space.png" alt="space" width={280} height={280} />
			<SquareButton variant="Black" size="Small">
				워크스페이스 생성하기
			</SquareButton>
		</div>
	);
};

export default NoWorkspace;
