import { ButtonHTMLAttributes } from 'react';

import Icon from '@/components/Icon';
import { colors } from '@/constants/colors';
import { IconId } from '@/types/icons';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	icon: IconId;
}

const IconButton = ({ icon, onClick }: IconButtonProps) => {
	return (
		<button className="bg-Purple-600 w-10 h-10 flex justify-center items-center rounded-full" onClick={onClick}>
			<Icon id={icon} color={colors['Purple-100']} size={16} />
		</button>
	);
};

export default IconButton;
