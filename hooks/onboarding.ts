import { useSearchParams } from 'next/navigation';

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
