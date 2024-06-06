'use server';

import { API_URLS } from '@/constants/url';
import { GetUserInfoResponseDTO } from '@/models/user/response/getUserInfoResponseDTO';
import { fetcher } from '@/utils/fetcher';
import { getApiUrl } from '@/utils/url';

export const getUserInfo: () => Promise<GetUserInfoResponseDTO> = async () => {
	const url = getApiUrl(API_URLS.GET_USER_INFO)();
	const fetch = await fetcher(url, true);
	return fetch;
};
