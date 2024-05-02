'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { getWorkspaceInfo } from '@/apis/workspace';
import { useAuth } from '@/hooks/auth';
import { useGetAfterLoginPathByWorkspaceState } from '@/hooks/onboarding';

const KakaoLogin = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const inviteCode = searchParams.get('state');
	const code = searchParams.get('code');
	const { useLogin } = useAuth();

	const loginHandler = async () => {
		await useLogin({ loginProvider: 'kakao', inviteCode: inviteCode || '', code: code || '' });
		const workspaceInfo = await getWorkspaceInfo();
		const redirectUrl = useGetAfterLoginPathByWorkspaceState(workspaceInfo.spaceState);
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

export default KakaoLogin;
