import Link from 'next/link';

import RoundedButton from '@/components/RoundedButton';

const LoginButton = () => {
	return (
		<Link href="/login">
			<RoundedButton variant="Purple" size="Small">
				로그인/회원가입
			</RoundedButton>
		</Link>
	);
};

export default LoginButton;
