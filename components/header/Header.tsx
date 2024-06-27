import { headers } from 'next/headers';

import SidebarButton from './SidebarButton';

import UserInfo from '@/components/header/UserInfo';
import { UrlType } from '@/constants/url';
import { isOnboardingUrl } from '@/utils/url';

const Header = () => {
	const headersList = headers();
	const headerPathname = headersList.get('x-current-path') || '';
	const isPlainHeader = isOnboardingUrl(headerPathname as UrlType);

	return (
		<header className="fixed top-0 h-[60px] w-full bg-black flex px-[30px] sm:px-[60px] justify-between">
			<SidebarButton />
			{!isPlainHeader && <UserInfo />}
		</header>
	);
};

export default Header;
