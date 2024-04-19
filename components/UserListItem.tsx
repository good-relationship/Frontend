import ProfileImage from '@/components/ProfileImage';

type UserListItemProps = {
	user: {
		id: number;
		nickname: string;
		email: string;
		profileImage: string;
	};
};

const UserListItem = ({ user }: UserListItemProps) => {
	const { nickname, email, profileImage } = user;

	return (
		<div className="flex gap-[10px] px-3 py-3 bg-White rounded-2xl items-center">
			<div>
				<ProfileImage size={45} src={profileImage} unoptimized />
			</div>
			<div className="flex flex-col">
				<p className="typo-Body3 text-Gray-500">{nickname}</p>
				<p className="typo-Body4 text-Gray-400">이메일 : {email}</p>
			</div>
		</div>
	);
};

export default UserListItem;
