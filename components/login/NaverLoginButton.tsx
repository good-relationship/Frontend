import Image from 'next/image';

import RoundedButton from '@/components/RoundedButton';

type NaverLoginButtonProps = {
	inviteCode: string;
};

const NaverLoginButton = ({ inviteCode }: NaverLoginButtonProps) => {
	const handleNaverLogin = () => {
		const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_LOGIN_REDIRECT_URI}&response_type=code&state=${inviteCode}`;
		window.location.href = naverLoginUrl;
	};

	return (
		<RoundedButton
			className="bg-Naver active:bg-Naver hover:bg-Naver active:brightness-90 hover:brightness-90"
			onClick={handleNaverLogin}
			size="Large"
		>
			<Image src="/icons/naver.svg" width={28} height={28} alt="naver icon" />
			<h6 className="typo-SubHeader3 text-White">네이버로 시작하기</h6>
		</RoundedButton>
	);
};

export default NaverLoginButton;
