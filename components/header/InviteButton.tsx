import InviteUser from '@/components/dialog/InviteUser';
import CopyLinkButton from '@/components/header/CopyLinkButton';
import RoundedButton from '@/components/RoundedButton';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const InviteButton = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<RoundedButton variant="Purple" size="Small">
					+ 초대하기
				</RoundedButton>
			</DialogTrigger>
			<DialogContent className=" max-w-[700px] items-center flex flex-col gap-[48px]">
				<InviteUser />
				<DialogClose>
					<CopyLinkButton />
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};

export default InviteButton;
