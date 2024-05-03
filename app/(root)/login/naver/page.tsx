'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/auth';
import { useGetAfterLoginPathByWorkspaceState } from '@/hooks/onboarding';

const NaverLogin = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const inviteCode = searchParams.get('state');
	const code = searchParams.get('code');
	const { useLogin } = useAuth();

	const loginHandler = async () => {
		const { spaceState } = await useLogin({
			loginProvider: 'naver',
			inviteCode: inviteCode || '',
			code: code || '',
		});
		const redirectUrl = useGetAfterLoginPathByWorkspaceState(spaceState || 'noSpace');
		router.push(redirectUrl);
	};

	useEffect(() => {
		loginHandler();
	}, []);

	return (
		<div>
			inviteCode: {inviteCode} code: {code}
		</div>
	);
};

export default NaverLogin;
