import { headers } from 'next/headers';

import SidebarButton from './SidebarButton';

import Logo from '@/components/header/Logo';
import UserInfo from '@/components/header/UserInfo';
import { UrlType } from '@/constants/url';
import { cn } from '@/lib/utils';
import { isOnboardingUrl, isWorkspaceUrl } from '@/utils/url';

const Header = () => {
	const headerList = headers();
	const headerPathname = headerList.get('x-pathname') || '';
	const isOnboarding = isOnboardingUrl(headerPathname as UrlType);
	const isWorkspace = isWorkspaceUrl(headerPathname as UrlType);

	const renderLeftContent = () => {
		if (isWorkspace) {
			return (
				<>
					<SidebarButton />
					<Logo className="hidden sm:block" />
				</>
			);
		}

		return <Logo />;
	};

	const renderRightContent = () => {
		if (isOnboarding) {
			return null;
		}

		return <UserInfo />;
	};

	return (
		<header
			className={cn(
				'fixed top-0 h-[60px] w-full bg-black flex px-[30px] sm:px-[60px]',
				!isOnboarding && 'justify-between',
			)}
		>
			{renderLeftContent()}
			{renderRightContent()}
		</header>
	);
};

export default Header;
