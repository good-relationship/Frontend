import { ButtonHTMLAttributes } from 'react';

import Icon from '@/components/Icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { colors } from '@/constants/colors';
import { IconId } from '@/types/icons';

type IconButtonName =
	| '카메라 켜기'
	| '카메라 끄기'
	| '마이크 켜기'
	| '마이크 끄기'
	| '화면 공유하기'
	| '화면 중지하기'
	| '기록하기'
	| '화이트보드 열기'
	| '회의 종료하기';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	icon: IconId;
	message?: IconButtonName;
}

const IconButton = ({ icon, onClick, message }: IconButtonProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						className="bg-Gray-400 text-Gray-100 opacity-75 w-10 h-10 flex justify-center items-center rounded-full"
						onClick={onClick}
					>
						<Icon id={icon} color={colors['Gray-100']} size={16} />
					</button>
				</TooltipTrigger>
				<TooltipContent>{message}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default IconButton;
