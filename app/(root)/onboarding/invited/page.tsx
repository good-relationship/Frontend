import { getWorkspaceMembers } from '@/apis/workspace';
import InvitedOnboardingTemplate from '@/components/onboarding/invited/InvitedOnboardingTemplate';

const InvitedWorkspace = async () => {
	const userList = await getWorkspaceMembers();
	return (
		<div className="flex-col-template">
			<InvitedOnboardingTemplate userList={userList} />
		</div>
	);
};

export default InvitedWorkspace;
