'use client';

import { usePathname } from 'next/navigation';

import SidebarLink from '@/components/sidebar/SidebarLink';
import SidebarTitle from '@/components/sidebar/SidebarTitle';
import { sidebarRoutings } from '@/constants/routings';

const Sidebar = () => {
	const pathname = usePathname();
	return (
		<aside className="w-[296px] h-full py-[10px]">
			<SidebarTitle />
			{sidebarRoutings.map(({ label, path, icon }) => {
				const isActive = pathname === path || pathname.startsWith(`${path}/`);
				return <SidebarLink key={label} label={label} path={path} icon={icon} isActive={isActive} />;
			})}
		</aside>
	);
};

export default Sidebar;
