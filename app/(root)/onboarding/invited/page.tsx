import Nav from '@/components/onboarding/Nav';

const InvitedWorkspace = () => {
	// TODO: 워크스페이스 이름 받아오기
	const workspaceName = '조은 사이 워크스페이스';
	const title = `${workspaceName}에\n 초대되셨습니다.`;

	return (
		<div>
			<Nav title={title} />
		</div>
	);
};

export default InvitedWorkspace;
