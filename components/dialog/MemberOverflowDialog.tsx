import { DialogProps } from '@radix-ui/react-dialog';
import React from 'react';

import MemberOverflow from '@/components/dialog/MemberOverflow';
import SquareButton from '@/components/SquareButton';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';

interface MemberOverflowDialogProps extends DialogProps {}

const MemberOverflowDialog = ({ open, onOpenChange }: MemberOverflowDialogProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[700px] items-center flex flex-col gap-[48px]">
				<MemberOverflow />
				<DialogClose>
					<SquareButton size="Large" variant="Black">
						닫기
					</SquareButton>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};

export default MemberOverflowDialog;
