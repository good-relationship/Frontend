'use client';

import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';

import SidebarLink from '@/components/sidebar/SidebarLink';
import SidebarTitle from '@/components/sidebar/SidebarTitle';
import { sidebarRoutings } from '@/constants/routings';
import { getMenuButtonState } from '@/stores/atoms/getMenuButton';

const Sidebar = () => {
	const [isSidebarOpen] = useRecoilState(getMenuButtonState);
	const pathname = usePathname();

	return (
		<aside
			className={`${isSidebarOpen.isOpen ? 'block' : 'hidden'} fixed left-0 top-[60px] sm:block w-screen sm:w-[300px] h-[calc(100vh-60px)] py-[10px] px-4 custom-shadow bg-White z-50`}
		>
			<SidebarTitle />
			{sidebarRoutings.map(({ label, path, icon }) => {
				const isActive = pathname === path || pathname.startsWith(`${path}/`);
				return <SidebarLink key={label} label={label} path={path} icon={icon} isActive={isActive} />;
			})}
		</aside>
	);
};

export default Sidebar;
