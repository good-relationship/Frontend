import { LoginRequestDTO } from '@/models/auth/request/loginRequestDTO';

export const login = async ({ loginProvider, inviteCode, code }: LoginRequestDTO) => {
	const url = `/login/oauth2/${loginProvider}?code=${code}&invitedCode=${inviteCode}`;
	const loginConfig = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const response = await fetch(url, loginConfig);

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		// TODO: 로그인 에러처리
		throw new Error('로그인 에러');
	}
};

export const refreshAccessToken = async (refreshToken: string) => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/login/oauth2/refresh?Refresh=${refreshToken}`;
	const apiConfig = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Refresh: refreshToken,
		},
	};

	const response = await fetch(url, apiConfig);

	if (response.ok) {
		const data = await response.json();
		return data.accessToken;
	} else {
		// TODO: 토큰 갱신 에러처리
		throw new Error('토큰 갱신 에러');
	}
};
