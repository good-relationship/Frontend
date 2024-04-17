'use client';

import { useSearchParams } from 'next/navigation';

import CompleteWorkspaceCreationTemplate from '@/components/onboarding/create/CompleteWorkspaceCreationTemplate';
import EnterWorkspaceNameTemplate from '@/components/onboarding/create/EnterWorkspaceNameTemplate';
import SearchScoolTemplate from '@/components/onboarding/create/SearchScoolTemplate';

const CreateWorkspace = () => {
	const searchParams = useSearchParams();

	const school = searchParams.get('school');
	const workspace = searchParams.get('workspace');

	const renderTemplateBySearchParams = () => {
		if (workspace) {
			return <CompleteWorkspaceCreationTemplate />;
		}

		if (school) {
			return <EnterWorkspaceNameTemplate />;
		}

		return <SearchScoolTemplate />;
	};

	return <div className="h-full">{renderTemplateBySearchParams()}</div>;
};

export default CreateWorkspace;
