import { getUserInfo } from '@/apis/user';
import InviteButton from '@/components/header/InviteButton';
import ProfileButton from '@/components/header/ProfileButton';

const LoggedInUser = async () => {
	const { userImage } = await getUserInfo();

	return (
		<div className="flex gap-5">
			<InviteButton />
			{userImage && <ProfileButton profileImageSrc={userImage} />}
		</div>
	);
};

export default LoggedInUser;
