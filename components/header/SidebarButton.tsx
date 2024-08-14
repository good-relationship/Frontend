'use client';

import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

import { getMenuButtonState } from '@/stores/atoms/getMenuButton';

const SidebarButton = () => {
	const [sidebarOpen, setSidebarOpen] = useRecoilState(getMenuButtonState);
	const controlSidebar = () => {
		setSidebarOpen({ isOpen: !sidebarOpen.isOpen });
	};

	return (
		<div className="gap-4 flex">
			<MenuIcon color="white" className="block sm:hidden h-auto w-8" onClick={controlSidebar} />
			<Image
				src="/icons/kan_text_horizontal.svg"
				alt="조은사이 가로 로고"
				width="0"
				height="0"
				className="w-[80px] sm:w-[150px] h-auto"
			/>
		</div>
	);
};

export default SidebarButton;
