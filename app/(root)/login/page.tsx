'use client';

import { useSearchParams } from 'next/navigation';

const Login = () => {
	const searchParams = useSearchParams();
	const inviteCode = searchParams.get('inviteCode');
	console.log(inviteCode);

	const handleKakaoLogin = () => {
		const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}&response_type=code&state=${inviteCode}`;
		window.location.href = kakaoLoginUrl;
	};

	const handleNaverLogin = () => {
		console.log('네이버 로그인');
	};

	return (
		<div className="h-full justify-center flex flex-col gap-5">
			로그인 페이지
			<button className="bg-Gray-500 text-white" onClick={handleKakaoLogin}>
				카카오 로그인
			</button>
			<button className="bg-Gray-500 text-white" onClick={handleNaverLogin}>
				네이버 로그인
			</button>
		</div>
	);
};

export default Login;
