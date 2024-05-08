import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/storage';
import { useGetAfterLoginPathByWorkspaceState } from '@/hooks/onboarding';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const inviteCode = searchParams.get('state');
	const code = searchParams.get('code');

	const url = `${process.env.NEXT_PUBLIC_URL}/login/oauth2/kakao?code=${code}&invitedCode=${inviteCode}`;
	const loginConfig = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const response = await fetch(url, loginConfig);

	if (!response.ok) {
		console.log(await response.text());
		// TODO: 로그인 에러처리
		throw new Error('로그인 에러');
	}

	const cookieStore = cookies();

	const { hasWorkSpace, accessToken, refreshToken } = (await response.json()) || 'noSpace';
	if (accessToken) {
		cookieStore.set(ACCESS_TOKEN, accessToken);
		cookieStore.set(REFRESH_TOKEN, refreshToken);
	}
	const redirectUrl = useGetAfterLoginPathByWorkspaceState(hasWorkSpace || 'noSpace');
	return new Response(null, {
		status: 302,
		headers: {
			Location: redirectUrl,
		},
	});
}
