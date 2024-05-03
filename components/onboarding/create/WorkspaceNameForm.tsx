'use client';

import { useRouter } from 'next/navigation';

import { createWorkspace } from '@/apis/workspace';
import Form from '@/components/form/Form';
import { workspaceNameSchema } from '@/constants/form';
import { useGetOnboardingInfoFromSearchParams } from '@/hooks/onboarding';
import { FormType } from '@/types/form';

const WorkspaceNameForm = () => {
	const router = useRouter();
	const { getSchoolName } = useGetOnboardingInfoFromSearchParams();

	const onSubmit = async (data: FormType) => {
		const workspaceName = data.workspaceName;
		const schoolName = getSchoolName();

		await createWorkspace({ schoolName, workspaceName });
		router.push(`${window.location}&workspace=${workspaceName}`);
	};

	return (
		<Form onSubmit={onSubmit} schema={workspaceNameSchema} className="w-full flex flex-col gap-2">
			<Form.Label>팀명</Form.Label>
			<Form.Input name="workspaceName" placeholder="팀명을 입력해주세요" countLimit={10} variant="Line" />
			<Form.HelperText className="px-4" name="workspaceName" />
			<div className="w-full flex justify-end">
				<Form.Button buttonType="square" size="Small">
					다음
				</Form.Button>
			</div>
		</Form>
	);
};

export default WorkspaceNameForm;
