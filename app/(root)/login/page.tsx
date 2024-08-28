import KakaoLoginButton from '@/components/login/KakaoLoginButton';
import NaverLoginButton from '@/components/login/NaverLoginButton';

const Login = () => {
	return (
		<div className="h-full justify-center flex flex-col gap-5 w-full items-center">
			<h1 className="typo-Header1">로그인</h1>
			<h6 className="typo-Body1 text-Gray-400">계정에 로그인하시고 협업을 시작해보세요</h6>
			<KakaoLoginButton />
			<NaverLoginButton />
		</div>
	);
};

export default Login;
