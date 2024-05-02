import { useCookies } from 'next-client-cookies';

import { login } from '@/apis/auth';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/storage';
import { LoginRequestDTO } from '@/models/auth/request/loginRequestDTO';

export const useAuth = () => {
	const cookies = useCookies();

	const useLogin = async ({ loginProvider, inviteCode, code }: LoginRequestDTO) => {
		const loginData = await login({ loginProvider, inviteCode, code });
		if (loginData) {
			cookies.set(ACCESS_TOKEN, loginData.accessToken);
			cookies.set(REFRESH_TOKEN, loginData.refreshToken);
		}

		return loginData;
	};

	const useLogout = () => {
		cookies.remove(ACCESS_TOKEN);
		cookies.remove(REFRESH_TOKEN);
	};

	const useGetAccessToken = () => {
		return cookies.get(ACCESS_TOKEN);
	};

	const useGetRefreshToken = () => {
		return cookies.get(REFRESH_TOKEN);
	};

	return { useLogin, useLogout, useGetAccessToken, useGetRefreshToken };
};
