'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { invitedToWorkspace } from '@/apis/workspace';
import { useIsLoggedIn } from '@/hooks/auth';
import { useGetAfterLoginPathByWorkspaceState } from '@/hooks/onboarding';

const InvitePage = () => {
	const searchParams = useSearchParams();
	const inviteCode = searchParams.get('inviteCode') || '';
	const router = useRouter();

	const inviteUserAndNavigate = async () => {
		const { spaceState } = await invitedToWorkspace(inviteCode);
		const redirectUrl = useGetAfterLoginPathByWorkspaceState(spaceState || 'NO_SPACE');

		router.push(redirectUrl);
	};

	const navigateToLoginWithInviteCode = () => {
		router.push(`/login?inviteCode=${inviteCode}`);
	};

	useEffect(() => {
		if (useIsLoggedIn()) {
			inviteUserAndNavigate();
		} else {
			navigateToLoginWithInviteCode();
		}
	}, []);

	return <div>로딩중입니다</div>;
};

export default InvitePage;
