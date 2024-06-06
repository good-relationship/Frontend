'use server';

import { API_URLS } from '@/constants/url';
import { WorkspaceInfo } from '@/models/onboarding/entity/onboarding';
import { GetUserWorkspaceInfoResponseDTO } from '@/models/onboarding/response/getWorkspaceUserInfoResponseDTO';
import { fetcher } from '@/utils/fetcher';
import { getApiUrl } from '@/utils/url';

export const createWorkspace = async ({ workspaceName, schoolName }: WorkspaceInfo) => {
	const url = getApiUrl(API_URLS.CREATE_WORKSPACE)();
	await fetcher(url, true, {
		method: 'POST',
		body: JSON.stringify({ workspaceName, schoolName }),
	});
};

export const getWorkspaceInfo = async () => {
	const url = getApiUrl(API_URLS.GET_WORKSPACE_INFO)();
	const fetch = await fetcher(url, true);
	return fetch;
};

export const invitedToWorkspace = async (inviteCode: string) => {
	const url = getApiUrl(API_URLS.INVITED_TO_WORKSPACE)({ inviteCode });
	const fetch = await fetcher(url, true, {
		method: 'POST',
	});
	return fetch;
};

export const getWorkspaceInviteCode = async () => {
	const url = getApiUrl(API_URLS.GET_WORKSPACE_INVITE_CODE)();
	const fetch = await fetcher(url, true);
	return fetch;
};

export const getWorkspaceMembers: () => Promise<GetUserWorkspaceInfoResponseDTO> = async () => {
	const url = getApiUrl(API_URLS.GET_WORKSPACE_MEMBERS)();
	const fetch = await fetcher(url, true);
	return fetch;
};

export const joinWorkspace = async () => {
	const url = getApiUrl(API_URLS.JOIN_WORKSPACE)();
	const fetch = await fetcher(url, true, {
		method: 'POST',
	});
	return fetch;
};
