import { getUserInfo } from '@/apis/user';
import InviteButton from '@/components/header/InviteButton';
import ProfileButton from '@/components/header/ProfileButton';

const LoggedInUser = async () => {
	const profileImageSrc = await getUserInfo().then((userInfo) => userInfo.userImage);

	return (
		<div className="flex gap-5">
			<InviteButton />
			{profileImageSrc && <ProfileButton profileImageSrc={profileImageSrc} />}
		</div>
	);
};

export default LoggedInUser;
