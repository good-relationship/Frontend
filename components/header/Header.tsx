'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import UserInfo from '@/components/header/UserInfo';

const Header = () => {
	const pathname = usePathname();
	const isPlainHeader = pathname.startsWith(`/onboarding/`);

	return (
		<header className="fixed top-0 h-[60px] w-full bg-black flex px-[60px] justify-between">
			<Image src="/icons/kan_text_horizontal.svg" alt="조은사이 가로 로고" width={150} height={30} />
			{!isPlainHeader && <UserInfo />}
		</header>
	);
};

export default Header;
