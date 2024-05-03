import CreateWorkspaceButton from '@/components/onboarding/invited/CreateWorkspaceButton';
import JoinWorkspaceButton from '@/components/onboarding/invited/JoinWorkspaceButton';
import { GetUserWorkspaceInfoResponseDTO } from '@/models/onboarding/response/getWorkspaceUserInfoResponseDTO';

type InvitedOnboardingFooterProps = {
	userList: GetUserWorkspaceInfoResponseDTO;
	setIsMemberOverflowDialogOpen: (isOpen: boolean) => void;
};

const InvitedOnboardingFooter = ({ userList, setIsMemberOverflowDialogOpen }: InvitedOnboardingFooterProps) => {
	return (
		<div className="flex flex-col gap-3 items-center">
			<p className="typo-Body1 text-Gray-400">초대에 응하시겠습니까?</p>
			<div className="flex gap-5 items-center">
				<CreateWorkspaceButton />
				<JoinWorkspaceButton
					userList={userList}
					setIsMemberOverflowDialogOpen={setIsMemberOverflowDialogOpen}
				/>
			</div>
		</div>
	);
};

export default InvitedOnboardingFooter;
