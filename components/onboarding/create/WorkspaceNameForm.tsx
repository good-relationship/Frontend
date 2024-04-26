'use client';

import { useRouter } from 'next/navigation';

import Form from '@/components/form/Form';
import { workspaceNameSchema } from '@/constants/form';
import { FormType } from '@/types/form';

const WorkspaceNameForm = () => {
	const router = useRouter();

	const onSubmit = (data: FormType) => {
		router.push(`${window.location}&workspace=${data.workspaceName}`);
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
