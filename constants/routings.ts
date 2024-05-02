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

export const URLS = Object.freeze({
	WORKSPACE_MEETING: '/meeting',
	WORKSPACE_DOCUMENT: '/document',
	WORKSPACE_SCHEDULE: '/schedule',
	WORKSPACE_SETTING: '/setting',
	WORKSPACE_DOCUMENT_FILE: (fileId: string) => `/document-file/${fileId}`,
	WORKSPACE_MEETING_ROOM: (meetingId: string) => `/meeting-room/${meetingId}`,
	WORKSPACE_WHITEBOARD_FILE: (fileId: string) => `/whiteboard-file/${fileId}`,
	ONBOARDING_CREATE: '/onboarding/create',
	ONBOARDING_EMPTY: '/onboarding/empty',
	ONBOARDING_INVITED: '/onboarding/invited',
	ONBOARDING_OVERFLOW: '/onboarding/overflow',
	LOGIN: '/login',
	LOGIN_KAKAO: '/login/kakao',
});

export const API_URLS = Object.freeze({
	SEARCH_SCHOOL: (schoolName: string) => `/workspace/school?name=${schoolName}`,
});
