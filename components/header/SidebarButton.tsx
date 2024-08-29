'use client';

import { MenuIcon } from 'lucide-react';
import { useRecoilState } from 'recoil';

import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import { getMenuButtonState } from '@/stores/atoms/getMenuButton';

const SidebarButton = () => {
	const [sidebarOpen, setSidebarOpen] = useRecoilState(getMenuButtonState);
	const controlSidebar = () => {
		setSidebarOpen({ isOpen: !sidebarOpen.isOpen });
	};

	if (sidebarOpen.isOpen) {
		return (
			<button onClick={controlSidebar} className="block sm:hidden">
				<Icon id="close" color={colors['White']} size={20} />
			</button>
		);
	}

	return <MenuIcon color="white" className="block sm:hidden h-auto w-8" onClick={controlSidebar} />;
};

export default SidebarButton;
