'use server';

import { API_URLS } from '@/constants/routings';
import { useGetAccessToken } from '@/hooks/auth';
import { GetUserInfoResponseDTO } from '@/models/user/response/getUserInfoResponseDTO';

export const getUserInfo: () => Promise<GetUserInfoResponseDTO> = async () => {
	const accessToken = await useGetAccessToken();
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API_URLS.GET_USER_INFO}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) {
		// TODO: 사용자 정보 조회 에러 처리
		throw new Error('사용자 정보 조회 에러');
	}

	return response.json();
};
