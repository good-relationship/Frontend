import { IconId } from '@/types/icons';

type SidebarRoutingType = {
	label: string;
	path: string;
	icon: IconId;
};

export const sidebarRoutings: SidebarRoutingType[] = [
	{
		label: '회의하기',
		path: '/meeting',
		icon: 'webcam',
	},
	{
		label: '기록하기',
		path: '/document',
		icon: 'pencil',
	},
	{
		label: '일정 관리',
		path: '/schedule',
		icon: 'calendar',
	},
	{
		label: '팀스페이스 설정',
		path: '/setting',
		icon: 'setting',
	},
];
