import { UrlType } from '@/constants/url';
import { IconId } from '@/types/icons';

type SidebarRoutingType = {
	label: string;
	path: UrlType;
	icon: IconId;
};

export const sidebarRoutings: SidebarRoutingType[] = [
	{
		label: '회의하기',
		path: '/workspace/meeting',
		icon: 'webcam',
	},
	{
		label: '기록하기',
		path: '/workspace/document',
		icon: 'pencil',
	},
	{
		label: '일정 관리',
		path: '/workspace/schedule',
		icon: 'calendar',
	},
	{
		label: '팀스페이스 설정',
		path: '/workspace/setting',
		icon: 'setting',
	},
];
