'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import MemberOverflowDialog from '@/components/dialog/MemberOverflowDialog';
import Nav from '@/components/onboarding/Nav';
import SquareButton from '@/components/SquareButton';
import UserListItem from '@/components/UserListItem';
import { MAX_WORKSPACE_MEMBER_COUNT } from '@/constants/workspaces';
import { mockGetUserWorkspaceInfoData } from '@/mocks/onboarding';

const InvitedWorkspace = () => {
	const route = useRouter();
	const [isMemberOverflowDialogOpen, setIsMemberOverflowDialogOpen] = useState(false);

	// TODO: 워크스페이스 이름 받아오기
	const workspaceName = '조은 사이 워크스페이스';
	const title = `${workspaceName}에\n 초대되셨습니다.`;

	const userList = mockGetUserWorkspaceInfoData.users;
	const isAcceptInvitePossible = userList.length < MAX_WORKSPACE_MEMBER_COUNT;

	const handleClickJoinWorkspace = () => {
		if (!isAcceptInvitePossible) {
			setIsMemberOverflowDialogOpen(true);
			return;
		}
		// TODO: 참여 수락 API 연결
		route.push('/document');
	};

	return (
		<div className="flex-col-template">
			<MemberOverflowDialog open={isMemberOverflowDialogOpen} onOpenChange={setIsMemberOverflowDialogOpen} />
			<Nav title={title} />
			<div className="w-full flex flex-col gap-[15px] px-[15px] custom-shadow-large">
				{userList.map((user) => (
					<UserListItem key={user.id} user={user} />
				))}
			</div>
			<div className="flex flex-col gap-3 items-center">
				<p className="typo-Body1 text-Gray-400">초대에 응하시겠습니까?</p>
				<div className="flex gap-5 items-center">
					<Link href="/onboarding/create">
						<span className="typo-Body1 text-Gray-400">새 워크스페이스 생성하기</span>
					</Link>
					<SquareButton size="Small" onClick={handleClickJoinWorkspace}>
						워크스페이스 참여하기
					</SquareButton>
				</div>
			</div>
		</div>
	);
};

export default InvitedWorkspace;
