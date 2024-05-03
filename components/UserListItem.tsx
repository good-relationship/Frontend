import ProfileImage from '@/components/ProfileImage';
import { WorkspaceUserInfo } from '@/models/onboarding/entity/onboarding';

type UserListItemProps = {
	user: WorkspaceUserInfo;
};

const UserListItem = ({ user }: UserListItemProps) => {
	const { userName, email, userImage } = user;

	return (
		<div className="flex gap-[10px] px-3 py-3 bg-White rounded-2xl items-center">
			<div>
				<ProfileImage size={45} src={userImage} unoptimized />
			</div>
			<div className="flex flex-col">
				<p className="typo-Body3 text-Gray-500">{userName}</p>
				<p className="typo-Body4 text-Gray-400">이메일 : {email}</p>
			</div>
		</div>
	);
};

export default UserListItem;
