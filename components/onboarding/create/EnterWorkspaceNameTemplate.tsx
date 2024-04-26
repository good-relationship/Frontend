import CreateProgressNav from '@/components/onboarding/create/CreateProgressNav';
import WorkspaceNameForm from '@/components/onboarding/create/WorkspaceNameForm';

const EnterWorkspaceNameTemplate = () => {
	return (
		<main className="flex-col-template">
			<CreateProgressNav />
			<div className="w-full h-full flex flex-col gap-5 items-end">
				<WorkspaceNameForm />
			</div>
		</main>
	);
};

export default EnterWorkspaceNameTemplate;
