import CountInput from '@/components/CountInput';
import CreateProgressNav from '@/components/onboarding/create/CreateProgressNav';
import SquareButton from '@/components/SquareButton';

const EnterWorkspaceNameTemplate = () => {
	return (
		<main className="flex-col-template">
			<CreateProgressNav />
			<div className="w-full h-full flex flex-col gap-5 items-end">
				<CountInput className="w-full" label="팀명" countLimit={10} />
				<SquareButton size="Small">다음</SquareButton>
			</div>
		</main>
	);
};

export default EnterWorkspaceNameTemplate;
