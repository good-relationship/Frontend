'use client';

import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';

import SidebarLink from '@/components/sidebar/SidebarLink';
import SidebarTitle from '@/components/sidebar/SidebarTitle';
import { sidebarRoutings } from '@/constants/routings';
import { getMenuButtonState } from '@/stores/atoms/getMenuButton';
import { isWorkspaceUrl } from '@/utils/url';

const Sidebar = () => {
	const [isSidebarOpen] = useRecoilState(getMenuButtonState);
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);
	const isSidebarUrl = isWorkspaceUrl(pathname);

	if (!isSidebarUrl) {
		return null;
	}

	return (
		<aside
			className={`${isSidebarOpen.isOpen ? 'block' : 'hidden'} fixed left-0 top-[60px] sm:block w-screen sm:w-[300px] h-[calc(100vh-60px)] py-[10px] px-4 custom-shadow bg-White z-50`}
		>
			<SidebarTitle />
			{sidebarRoutings.map(({ label, path, icon }) => {
				return <SidebarLink key={label} label={label} path={path} icon={icon} isActive={isActive(path)} />;
			})}
		</aside>
	);
};

export default Sidebar;
