'use client';

import { useState } from 'react';

import MemberOverflowDialog from '@/components/dialog/MemberOverflowDialog';
import InvitedOnboardingFooter from '@/components/onboarding/invited/InvitedOnboardingFooter';
import { GetUserWorkspaceInfoResponseDTO } from '@/models/onboarding/response/getWorkspaceUserInfoResponseDTO';

type InvitedOnboardingTemplateProps = {
	userList: GetUserWorkspaceInfoResponseDTO;
	children: React.ReactNode;
};

const InvitedOnboardingTemplate = ({ userList, children }: InvitedOnboardingTemplateProps) => {
	const [isMemberOverflowDialogOpen, setIsMemberOverflowDialogOpen] = useState(false);

	return (
		<>
			<MemberOverflowDialog open={isMemberOverflowDialogOpen} onOpenChange={setIsMemberOverflowDialogOpen} />
			{children}
			<InvitedOnboardingFooter
				userList={userList}
				setIsMemberOverflowDialogOpen={setIsMemberOverflowDialogOpen}
			/>
		</>
	);
};

export default InvitedOnboardingTemplate;
