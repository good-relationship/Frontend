export const WORKSPACE_ROUTES = Object.freeze({
	WORKSPACE: '/workspace',
	WORKSPACE_MEETING: '/workspace/meeting',
	WORKSPACE_DOCUMENT: '/workspace/document',
	WORKSPACE_SCHEDULE: '/workspace/schedule',
	WORKSPACE_SETTING: '/workspace/setting',
	WORKSPACE_DOCUMENT_FILE: '/document-file',
	WORKSPACE_MEETING_ROOM: '/meeting-room',
	WORKSPACE_WHITEBOARD_FILE: '/whiteboard-file',
});

export const ONBOARDING_ROUTES = Object.freeze({
	ONBOARDING_CREATE: '/onboarding/create',
	ONBOARDING_EMPTY: '/onboarding/empty',
	ONBOARDING_INVITED: '/onboarding/invited',
	ONBOARDING_OVERFLOW: '/onboarding/overflow',
});

export const ROUTES = Object.freeze({
	...WORKSPACE_ROUTES,
	...ONBOARDING_ROUTES,
	LOGIN: '/login',
	LOGIN_KAKAO: '/login/kakao',
	LOGIN_NAVER: '/login/naver',
	INVITED: '/invite',
});

export const WORKSPACE_API_URLS = Object.freeze({
	SEARCH_SCHOOL: '/workspace/school',
	CREATE_WORKSPACE: '/workspace/create',
	GET_WORKSPACE_INFO: '/workspace/info',
	INVITED_TO_WORKSPACE: '/workspace/invited',
	GET_WORKSPACE_INVITE_CODE: '/workspace/inviteCode',
	GET_WORKSPACE_MEMBERS: '/workspace/member',
	JOIN_WORKSPACE: '/workspace/join',
	LEAVE_WORKSPACE: '/workspace/leave',
});

export const USER_API_URLS = Object.freeze({
	GET_USER_INFO: '/user/info',
	GET_USER_ROOM_INFO: '/user/room/info',
});

export const MEET_ROOM_API_URLS = Object.freeze({
	CREATE_MEET_ROOM: '/meet/room/create',
	JOIN_MEET_ROOM: '/meet/room/join',
	LEAVE_MEET_ROOM: '/meet/room/leave',
	GET_MEET_ROOM_LIST: '/meet/room/list',
});

export const API_URLS = Object.freeze({
	...WORKSPACE_API_URLS,
	...USER_API_URLS,
	...MEET_ROOM_API_URLS,
});

export type RoutesKeyType = keyof typeof ROUTES;
export type RoutesType = (typeof ROUTES)[RoutesKeyType];
export type ApiUrlKeyType = keyof typeof API_URLS;
export type ApiUrlType = (typeof API_URLS)[ApiUrlKeyType];
export type UrlKeyType = RoutesKeyType | ApiUrlKeyType;
export type UrlType = RoutesType | ApiUrlType;
