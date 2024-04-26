import InviteButton from '@/components/header/InviteButton';
import ProfileButton from '@/components/header/ProfileButton';

const LoggedInUser = () => {
	// TODO: 프로필 이미지 URL 받아오기
	const profileImageSrc = '/icons/kan_circle.svg';

	return (
		<div className="flex gap-5">
			<InviteButton />
			<ProfileButton profileImageSrc={profileImageSrc} />
		</div>
	);
};

export default LoggedInUser;
