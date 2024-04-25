import LogoutButton from '@/components/header/LogoutButton';
import ProfileImage from '@/components/ProfileImage';
import { Popover, PopoverTrigger } from '@/components/ui/popover';

type ProfileButtonProps = {
	profileImageSrc: string;
};

const ProfileButton = ({ profileImageSrc }: ProfileButtonProps) => {
	return (
		<Popover>
			<PopoverTrigger>
				<ProfileImage src={profileImageSrc} />
			</PopoverTrigger>
			<LogoutButton />
		</Popover>
	);
};

export default ProfileButton;
