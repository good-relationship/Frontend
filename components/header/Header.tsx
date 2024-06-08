import { headers } from 'next/headers';
import Image from 'next/image';

import UserInfo from '@/components/header/UserInfo';
import { UrlType } from '@/constants/url';
import { isOnboardingUrl } from '@/utils/url';

const Header = () => {
	const headersList = headers();
	const headerPathname = headersList.get('x-current-path') || '';
	const isPlainHeader = isOnboardingUrl(headerPathname as UrlType);

	return (
		<header className="fixed top-0 h-[60px] w-full bg-black flex px-[60px] justify-between">
			<Image
				src="/icons/kan_text_horizontal.svg"
				alt="조은사이 가로 로고"
				width="0"
				height="0"
				className="w-[150px] h-auto"
			/>
			{!isPlainHeader && <UserInfo />}
		</header>
	);
};

export default Header;
