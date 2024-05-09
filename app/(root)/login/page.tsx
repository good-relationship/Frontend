'use client';

import { useSearchParams } from 'next/navigation';

import KakaoLoginButton from '@/components/login/KakaoLoginButton';
import NaverLoginButton from '@/components/login/NaverLoginButton';

const Login = () => {
	const searchParams = useSearchParams();
	const inviteCode = searchParams.get('inviteCode') || '';

	return (
		<div className="h-full justify-center flex flex-col gap-5">
			로그인 페이지
			<KakaoLoginButton inviteCode={inviteCode} />
			<NaverLoginButton inviteCode={inviteCode} />
		</div>
	);
};

export default Login;
