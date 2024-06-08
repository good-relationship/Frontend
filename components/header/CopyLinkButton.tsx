'use client';

import { getWorkspaceInviteCode } from '@/apis/workspace';
import SquareButton from '@/components/SquareButton';
import { useToast } from '@/components/ui/use-toast';
import { ROUTES } from '@/constants/url';
import { getPublicUrl } from '@/utils/url';

type CopyLinkButtonProps = {
	closeDialog: () => void;
};

const CopyLinkButton = ({ closeDialog }: CopyLinkButtonProps) => {
	const { toast } = useToast();

	const copyLink = async () => {
		const inviteCode = await getWorkspaceInviteCode();
		const copyTextUrl = getPublicUrl(ROUTES.INVITED)()(inviteCode);
		navigator.clipboard.writeText(copyTextUrl).then(() => {
			closeDialog();
			toast({
				title: '링크가 복사되었습니다!',
			});
		});
	};

	return (
		<SquareButton size="Large" variant="Black" onClick={copyLink}>
			링크 복사하기
		</SquareButton>
	);
};

export default CopyLinkButton;
