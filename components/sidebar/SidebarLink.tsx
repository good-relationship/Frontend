import Link from 'next/link';
import { useRecoilState } from 'recoil';

import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import { cn } from '@/lib/utils';
import { getMenuButtonState } from '@/stores/atoms/getMenuButton';
import { IconId } from '@/types/icons';

type SidebarLinkProps = {
	label: string;
	path: string;
	icon: IconId;
	isActive: boolean;
};

const SidebarLink = ({ label, path, icon, isActive }: SidebarLinkProps) => {
	const [sidebarOpen, setSidebarOpen] = useRecoilState(getMenuButtonState);
	const controlSidebar = () => {
		setSidebarOpen({ isOpen: !sidebarOpen.isOpen });
	};

	return (
		<Link
			href={path}
			className={cn('flex gap-[10px] rounded-[10px] typo-SubHeader3 px-5 py-[15px]', {
				'!text-Purple-500 bg-Purple-100': isActive,
			})}
			onClick={controlSidebar}
		>
			<Icon id={icon} color={isActive ? colors['Purple-500'] : colors['Gray-400']} size={20} />
			<span>{label}</span>
		</Link>
	);
};

export default SidebarLink;
