import { useSearchParams } from 'next/navigation';

import { ROUTES } from '@/constants/url';
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
	HAS_WORKSPACE: ROUTES.WORKSPACE,
	NO_SPACE: ROUTES.ONBOARDING_EMPTY,
	INVITED: ROUTES.ONBOARDING_INVITED,
	OVERFLOW: ROUTES.ONBOARDING_OVERFLOW,
};

export const useGetAfterLoginPathByWorkspaceState = (workspaceState: WorkspaceState) => {
	return afterLoginPathMatchingByWorkspaceState[workspaceState];
};
