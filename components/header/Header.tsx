import Image from 'next/image';

import UserInfo from '@/components/header/UserInfo';

type HeaderProps = {
	variant?: 'default' | 'user-info';
};

const Header = ({ variant = 'default' }: HeaderProps) => {
	const isUserInfoNeeded = variant === 'user-info';

	return (
		<header className="fixed top-0 h-[60px] w-full bg-black flex px-[60px] justify-between">
			<Image src="/icons/kan_text_horizontal.svg" alt="조은사이 가로 로고" width={150} height={30} />
			{isUserInfoNeeded && <UserInfo />}
		</header>
	);
};

export default Header;
