import ProfileImage from '@/components/ProfileImage';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const ProfileButton = () => {
	return (
		<Popover>
			<PopoverTrigger>
				<ProfileImage />
			</PopoverTrigger>
			<PopoverContent>로그아웃</PopoverContent>
		</Popover>
	);
};

export default ProfileButton;
