import { API_URLS, URLS, UrlType } from '@/constants/routings';

export const useGetUrl = () => {
	const getWorkspaceDocumentFileUrl = (fileId: string) => `${URLS.WORKSPACE_DOCUMENT_FILE}/${fileId}`;
	const getWorkspaceMeetingRoomUrl = (meetingId: string) => `${URLS.WORKSPACE_MEETING_ROOM}/${meetingId}`;
	const getWorkspaceWhiteboardFileUrl = (fileId: string) => `${URLS.WORKSPACE_WHITEBOARD_FILE}/${fileId}`;

	const getSearchSchoolUrl = (schoolName: string) => `${API_URLS.SEARCH_SCHOOL}?name=${schoolName}`;
	const getInvitedUrl = (inviteCode: string) =>
		`${process.env.NEXT_PUBLIC_URL}${URLS.INVITED}?inviteCode=${inviteCode}`;
	const getJoinWorkspaceUrl = () => `${process.env.NEXT_PUBLIC_URL}${API_URLS.JOIN_WORKSPACE}`;

	const workspaceUrls: UrlType[] = [
		URLS.WORKSPACE,
		URLS.WORKSPACE_MEETING,
		URLS.WORKSPACE_DOCUMENT,
		URLS.WORKSPACE_SCHEDULE,
		URLS.WORKSPACE_SETTING,
	];

	const onboardingUrls: UrlType[] = [
		URLS.ONBOARDING_CREATE,
		URLS.ONBOARDING_EMPTY,
		URLS.ONBOARDING_INVITED,
		URLS.ONBOARDING_OVERFLOW,
	];

	const isWorkspaceUrl = (url: UrlType) => workspaceUrls.includes(url);
	const isOnboardingUrl = (url: UrlType) => onboardingUrls.includes(url);

	return {
		getWorkspaceDocumentFileUrl,
		getWorkspaceMeetingRoomUrl,
		getWorkspaceWhiteboardFileUrl,
		getSearchSchoolUrl,
		getInvitedUrl,
		getJoinWorkspaceUrl,
		isWorkspaceUrl,
		isOnboardingUrl,
	};
};
