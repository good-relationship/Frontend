'use client';

import { useRouter } from 'next/navigation';

import Form from '@/components/form/Form';
import CreateProgressNav from '@/components/onboarding/create/CreateProgressNav';
import SquareButton from '@/components/SquareButton';
import { workspaceNameSchema } from '@/constants/form';
import { FormType } from '@/types/form';

const EnterWorkspaceNameTemplate = () => {
	const router = useRouter();

	const onSubmit = (data: FormType) => {
		console.log(data);
	};

	const handleClickNext = () => {
		router.push(`${window.location}&workspace=workspaceName`);
	};

	return (
		<main className="flex-col-template">
			<CreateProgressNav />
			<div className="w-full h-full flex flex-col gap-5 items-end">
				<Form onSubmit={onSubmit} schema={workspaceNameSchema} className="w-full flex flex-col gap-2">
					<Form.Label>팀명</Form.Label>
					<Form.Input name="workspaceName" placeholder="팀명을 입력해주세요" countLimit={10} variant="Line" />
					<Form.HelperText className="px-4" name="workspaceName" />
					<div className="w-full flex justify-end">
						<SquareButton size="Small" onClick={handleClickNext}>
							다음
						</SquareButton>
					</div>
				</Form>
			</div>
		</main>
	);
};

export default EnterWorkspaceNameTemplate;
