import InviteButton from '@/components/header/InviteButton';
import ProfileButton from '@/components/header/ProfileButton';

const LoggedInUser = () => {
	return (
		<div className="flex gap-5">
			<InviteButton />
			<ProfileButton />
		</div>
	);
};

export default LoggedInUser;
