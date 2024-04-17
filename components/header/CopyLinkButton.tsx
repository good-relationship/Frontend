'use client';

import SquareButton from '@/components/SquareButton';
import { useToast } from '@/components/ui/use-toast';

const CopyLinkButton = () => {
	const { toast } = useToast();
	const copyLink = () => {
		toast({
			title: '링크가 복사되었습니다!',
		});
	};

	return (
		<SquareButton size="Large" variant="Black" onClick={copyLink}>
			링크 복사하기
		</SquareButton>
	);
};

export default CopyLinkButton;
