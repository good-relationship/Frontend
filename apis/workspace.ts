'use server';

import { cookies } from 'next/headers';

import { API_URLS } from '@/constants/routings';
import { ACCESS_TOKEN } from '@/constants/storage';
import { WorkspaceInfo } from '@/models/onboarding/entity/onboarding';

export const createWorkspace = async ({ workspaceName, schoolName }: WorkspaceInfo) => {
	const { CREATE_WORKSPACE } = API_URLS;
	const cookieStore = cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

	const response = await fetch(`${process.env.NEXT_PUBLIC_URL}${CREATE_WORKSPACE}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({ workspaceName, schoolName }),
	});

	if (!response.ok) {
		// TODO: workspace 생성 오류 처리
		throw new Error('workspace 생성 오류');
	}
};

export const getWorkspaceInfo = async () => {
	const { GET_WORKSPACE_INFO } = API_URLS;
	const cookieStore = cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

	const response = await fetch(`${process.env.NEXT_PUBLIC_URL}${GET_WORKSPACE_INFO}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) {
		// TODO: workspace 정보 조회 오류 처리
		throw new Error('workspace 정보 조회 오류');
	}

	return response.json();
};

export const invitedToWorkspace = async (inviteCode: string) => {
	const cookieStore = cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL}${API_URLS.INVITED_TO_WORKSPACE}?inviteCode=${inviteCode}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	if (!response.ok) {
		// TODO: 초대받기 오류 처리
		throw new Error('초대받기 오류');
	}

	return response.json();
};

export const getWorkspaceInviteCode = async () => {
	const cookieStore = cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

	const response = await fetch(`${process.env.NEXT_PUBLIC_URL}${API_URLS.GET_WORKSPACE_INVITE_CODE}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) {
		// TODO: 초대 코드 조회 오류 처리
		console.log(response);
		throw new Error('초대 코드 조회 오류');
	}

	return response.json();
};
