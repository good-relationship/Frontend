'use server';

import { API_URLS } from '@/constants/url';
import { GetUserInfoResponseDTO } from '@/models/user/response/getUserInfoResponseDTO';
import { GetUserRoomInfoResponseDTO } from '@/models/user/response/getUserRoomInfoResponseDTO';
import { fetcher } from '@/utils/fetcher';
import { getApiUrl } from '@/utils/url';

export const getUserInfo: () => Promise<GetUserInfoResponseDTO> = async () => {
	const url = getApiUrl(API_URLS.GET_USER_INFO)()();
	return await fetcher(url, true);
};

export const getUserRoomInfo: () => Promise<GetUserRoomInfoResponseDTO> = async () => {
	const url = getApiUrl(API_URLS.GET_USER_ROOM_INFO)()();
	return await fetcher(url, true);
};
