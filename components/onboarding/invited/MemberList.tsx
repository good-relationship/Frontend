import { getWorkspaceMembers } from '@/apis/workspace';
import UserListItem from '@/components/UserListItem';

const MemberList = async () => {
	const userList = await getWorkspaceMembers();
	return (
		<div className="w-full flex flex-col gap-[15px] px-[15px] custom-shadow-large">
			{userList.map((user) => (
				<UserListItem key={user.userId} user={user} />
			))}
		</div>
	);
};

export default MemberList;
