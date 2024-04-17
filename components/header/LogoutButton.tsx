'use client';

import Link from 'next/link';

import { PopoverClose, PopoverContent } from '@/components/ui/popover';

const LogoutButton = () => {
	// TODO: 로그아웃 기능 구현
	const logout = () => {
		console.log('logout');
	};

	return (
		<PopoverContent>
			<PopoverClose asChild>
				<Link href="/login" onClick={logout}>
					로그아웃
				</Link>
			</PopoverClose>
		</PopoverContent>
	);
};

export default LogoutButton;
