'use server';

import { cookies } from 'next/headers';

import { API_URLS } from '@/constants/routings';
import { ACCESS_TOKEN } from '@/constants/storage';
import { WorkspaceInfo } from '@/models/onboarding/entity/onboarding';

export const createWorkspace = async ({ workspaceName, schoolName }: WorkspaceInfo) => {
	const { CREATE_WORKSPACE } = API_URLS;
	const cookieStore = cookies();
	const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

	const response = await fetch(`${process.env.URL}${CREATE_WORKSPACE}`, {
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
