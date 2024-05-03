'use client';

import { getWorkspaceInviteCode } from '@/apis/workspace';
import SquareButton from '@/components/SquareButton';
import { useToast } from '@/components/ui/use-toast';
import { useGetUrl } from '@/hooks/url';

const CopyLinkButton = () => {
	const { toast } = useToast();
	const { getInvitedUrl } = useGetUrl();

	const copyLink = async () => {
		const inviteCode = await getWorkspaceInviteCode();
		const copyText = getInvitedUrl(inviteCode.inviteCode);
		navigator.clipboard.writeText(copyText).then(() => {
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
