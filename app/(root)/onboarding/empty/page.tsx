import Image from 'next/image';
import Link from 'next/link';

import Nav from '@/components/onboarding/Nav';
import SquareButton from '@/components/SquareButton';
import { URLS } from '@/constants/routings';

const NoWorkspace = () => {
	const navInfo = {
		title: '소속된 워크스페이스가 없습니다.',
		description: '워크스페이스를 만들고 팀원을 초대해보세요!',
	};

	const { ONBOARDING_CREATE } = URLS;

	return (
		<div className="flex-col-template">
			<Nav title={navInfo.title} description={navInfo.description} />
			<Image src="/images/space.png" alt="space" width={210} height={210} />
			<Link href={ONBOARDING_CREATE}>
				<SquareButton variant="Black" size="Small">
					워크스페이스 생성하기
				</SquareButton>
			</Link>
		</div>
	);
};

export default NoWorkspace;
