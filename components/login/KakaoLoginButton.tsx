'use client';

import Image from 'next/image';

import RoundedButton from '@/components/RoundedButton';
import { INVITED_CODE } from '@/constants/searchparams';
import { useGetSearchParams } from '@/hooks/searchParams';

const KakaoLoginButton = () => {
	const { getSearchParams } = useGetSearchParams();
	const inviteCode = getSearchParams(INVITED_CODE);

	const handleKakaoLogin = () => {
		const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}&response_type=code&state=${inviteCode}`;
		window.location.href = kakaoLoginUrl;
	};

	return (
		<RoundedButton
			className="bg-Kakao active:bg-Kakao hover:bg-Kakao active:brightness-90 hover:brightness-90"
			onClick={handleKakaoLogin}
			size="Large"
		>
			<Image src="/icons/kakao.svg" width={28} height={28} alt="kakao icon" />
			<h6 className="typo-SubHeader3 text-black">카카오로 시작하기</h6>
		</RoundedButton>
	);
};

export default KakaoLoginButton;
