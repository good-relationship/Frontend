'use client';

import { useRouter } from 'next/navigation';

import SquareButton from '@/components/SquareButton';
import { MAX_WORKSPACE_MEMBER_COUNT } from '@/constants/workspaces';
import { GetUserWorkspaceInfoResponseDTO } from '@/models/onboarding/response/getWorkspaceUserInfoResponseDTO';

type JoinWorkspaceButtonProps = {
	userList: GetUserWorkspaceInfoResponseDTO;
	setIsMemberOverflowDialogOpen: (isOpen: boolean) => void;
};

const JoinWorkspaceButton = ({ userList, setIsMemberOverflowDialogOpen }: JoinWorkspaceButtonProps) => {
	const isAcceptInvitePossible = userList.length < MAX_WORKSPACE_MEMBER_COUNT;
	const route = useRouter();

	const handleClickJoinWorkspace = () => {
		if (!isAcceptInvitePossible) {
			setIsMemberOverflowDialogOpen(true);
			return;
		}
		// TODO: 참여 수락 API 연결
		route.push('/document');
	};

	return (
		<SquareButton size="Medium1" onClick={handleClickJoinWorkspace}>
			워크스페이스 참여하기
		</SquareButton>
	);
};

export default JoinWorkspaceButton;
