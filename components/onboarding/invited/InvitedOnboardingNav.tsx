import { getWorkspaceInfo } from '@/apis/workspace';
import Nav from '@/components/onboarding/Nav';

const InvitedOnboardingNav = async () => {
	const { workspaceName } = await getWorkspaceInfo();
	const title = `${workspaceName}에\n 초대되셨습니다.`;
	return <Nav title={title} />;
};

export default InvitedOnboardingNav;
