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
	hasWorkSpace: URLS.WORKSPACE,
	noSpace: URLS.ONBOARDING_EMPTY,
	invited: URLS.ONBOARDING_INVITED,
	overflow: URLS.ONBOARDING_OVERFLOW,
};

export const useGetAfterLoginPathByWorkspaceState = (workspaceState: WorkspaceState) => {
	return afterLoginPathMatchingByWorkspaceState[workspaceState];
};
