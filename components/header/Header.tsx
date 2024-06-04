import { headers } from 'next/headers';
import Image from 'next/image';

import UserInfo from '@/components/header/UserInfo';
import { UrlType } from '@/constants/routings';
import { useGetUrl } from '@/hooks/url';

const Header = () => {
	const { isOnboardingUrl } = useGetUrl();
	const headersList = headers();
	const headerPathname = headersList.get('x-current-path') || '';
	const isPlainHeader = isOnboardingUrl(headerPathname as UrlType);

	return (
		<header className="fixed top-0 h-[60px] w-full bg-black flex px-[60px] justify-between">
			<Image src="/icons/kan_text_horizontal.svg" alt="조은사이 가로 로고" width={150} height={30} />
			{!isPlainHeader && <UserInfo />}
		</header>
	);
};

export default Header;
