import Link from 'next/link';

import Nav from '@/components/onboarding/Nav';
import SquareButton from '@/components/SquareButton';
import UserListItem from '@/components/UserListItem';

const InvitedWorkspace = () => {
	// TODO: 워크스페이스 이름 받아오기
	const workspaceName = '조은 사이 워크스페이스';
	const title = `${workspaceName}에\n 초대되셨습니다.`;

	const userList = [
		{
			id: 1,
			nickname: '김코딩',
			email: 'xxx@naver.com',
			profileImage: 'https://via.placeholder.com/45',
		},
		{
			id: 2,
			nickname: '김디자인',
			email: 'sdfsf@naver.com',
			profileImage: 'https://via.placeholder.com/45',
		},
		{
			id: 1,
			nickname: '김코딩',
			email: 'xxx@naver.com',
			profileImage: 'https://via.placeholder.com/45',
		},
		{
			id: 2,
			nickname: '김디자인',
			email: 'sdfsf@naver.com',
			profileImage: 'https://via.placeholder.com/45',
		},
	];

	return (
		<div className="flex-col-template">
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
					<SquareButton size="Small">워크스페이스 참여하기</SquareButton>
				</div>
			</div>
		</div>
	);
};

export default InvitedWorkspace;
