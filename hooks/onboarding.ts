import { useSearchParams } from 'next/navigation';

export const useCompleteOnboarding = () => {
	const searchParams = useSearchParams();

	const requestCompleteOnboarding = () => {
		const schoolName = searchParams.get('school');
		const workspaceName = searchParams.get('workspace');
		// TODO: API 연결하기
		console.log(`Completing onboarding for ${schoolName} - ${workspaceName}`);
	};

	const getSchoolName = () => {
		return searchParams.get('school');
	};

	const getWorkspaceName = () => {
		return searchParams.get('workspace');
	};

	return { requestCompleteOnboarding, getSchoolName, getWorkspaceName };
};
