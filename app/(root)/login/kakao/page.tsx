'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/auth';

const KakaoLogin = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const inviteCode = searchParams.get('state');
	const code = searchParams.get('code');
	const { useLogin } = useAuth();

	const loginHandler = async () => {
		await useLogin({ loginProvider: 'kakao', inviteCode: inviteCode || '', code: code || '' });
		router.push('/document');
	};

	useEffect(() => {
		router.prefetch('/document');
		loginHandler();
	}, []);

	return (
		<div>
			inviteCode: {inviteCode} code: {code}
		</div>
	);
};

export default KakaoLogin;
