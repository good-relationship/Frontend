'use client';

import { useState } from 'react';

import MemberOverflowDialog from '@/components/dialog/MemberOverflowDialog';
import InvitedOnboardingFooter from '@/components/onboarding/invited/InvitedOnboardingFooter';
import InvitedOnboardingNav from '@/components/onboarding/invited/InvitedOnboardingNav';
import MemberList from '@/components/onboarding/invited/MemberList';
import { GetUserWorkspaceInfoResponseDTO } from '@/models/onboarding/response/getWorkspaceUserInfoResponseDTO';

type InvitedOnboardingTemplateProps = {
	userList: GetUserWorkspaceInfoResponseDTO;
};

const InvitedOnboardingTemplate = ({ userList }: InvitedOnboardingTemplateProps) => {
	const [isMemberOverflowDialogOpen, setIsMemberOverflowDialogOpen] = useState(false);
	return (
		<>
			<MemberOverflowDialog open={isMemberOverflowDialogOpen} onOpenChange={setIsMemberOverflowDialogOpen} />
			<InvitedOnboardingNav />
			<MemberList />
			<InvitedOnboardingFooter
				userList={userList}
				setIsMemberOverflowDialogOpen={setIsMemberOverflowDialogOpen}
			/>
		</>
	);
};

export default InvitedOnboardingTemplate;
