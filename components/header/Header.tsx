import { MenuIcon } from 'lucide-react';
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
		<header className="fixed top-0 h-[60px] w-full bg-black flex px-[30px] sm:px-[60px] justify-between">
			<div className="gap-4 flex">
				<MenuIcon color="white" className="block sm:hidden h-auto w-8" />
				<Image
					src="/icons/kan_text_horizontal.svg"
					alt="조은사이 가로 로고"
					width="0"
					height="0"
					className="w-[80px] sm:w-[150px] h-auto"
				/>
			</div>
			{!isPlainHeader && <UserInfo />}
		</header>
	);
};

export default Header;
