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
