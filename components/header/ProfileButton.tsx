import LogoutButton from '@/components/header/LogoutButton';
import ProfileImage from '@/components/ProfileImage';
import { Popover, PopoverTrigger } from '@/components/ui/popover';

const ProfileButton = () => {
	return (
		<Popover>
			<PopoverTrigger>
				<ProfileImage />
			</PopoverTrigger>
			<LogoutButton />
		</Popover>
	);
};

export default ProfileButton;
