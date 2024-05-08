import { useSearchParams } from 'next/navigation';

import { URLS } from '@/constants/routings';
import { WorkspaceState } from '@/models/onboarding/entity/onboarding';

export const useGetOnboardingInfoFromSearchParams = () => {
	const searchParams = useSearchParams();

	const getSchoolName = () => {
		return searchParams.get('school') || '';
	};

	const getWorkspaceName = () => {
		return searchParams.get('workspace') || '';
	};

	return { getSchoolName, getWorkspaceName };
};

const afterLoginPathMatchingByWorkspaceState = {
	HAS_WORKSPACE: URLS.WORKSPACE,
	NO_SPACE: URLS.ONBOARDING_EMPTY,
	INVITED: URLS.ONBOARDING_INVITED,
	OVERFLOW: URLS.ONBOARDING_OVERFLOW,
};

export const useGetAfterLoginPathByWorkspaceState = (workspaceState: WorkspaceState) => {
	return afterLoginPathMatchingByWorkspaceState[workspaceState];
};
