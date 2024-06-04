'use client';

import { useRouter } from 'next/navigation';

import { PopoverClose, PopoverContent } from '@/components/ui/popover';
import { useLogout } from '@/hooks/auth';

const LogoutButton = () => {
	const router = useRouter();

	const handleClickLogout = () => {
		useLogout();
		router.push('/login');
	};

	return (
		<PopoverContent>
			<PopoverClose asChild>
				<button className="text-sm text-gray-400" onClick={handleClickLogout}>
					로그아웃
				</button>
			</PopoverClose>
		</PopoverContent>
	);
};

export default LogoutButton;
