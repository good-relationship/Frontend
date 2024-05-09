import { Suspense } from 'react';

import { getWorkspaceMembers } from '@/apis/workspace';
import InvitedOnboardingNav from '@/components/onboarding/invited/InvitedOnboardingNav';
import InvitedOnboardingTemplate from '@/components/onboarding/invited/InvitedOnboardingTemplate';
import MemberList from '@/components/onboarding/invited/MemberList';

const InvitedWorkspace = async () => {
	const userList = await getWorkspaceMembers();
	return (
		<div className="flex-col-template">
			<InvitedOnboardingTemplate userList={userList}>
				<Suspense fallback={<div>Loading...</div>}>
					<InvitedOnboardingNav />
					<MemberList />
				</Suspense>
			</InvitedOnboardingTemplate>
		</div>
	);
};

export default InvitedWorkspace;
