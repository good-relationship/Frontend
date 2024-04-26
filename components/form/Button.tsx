import { useFormContext } from 'react-hook-form';

import RoundedButton, { RoundedButtonProps } from '@/components/RoundedButton';
import SquareButton, { SquareButtonProps } from '@/components/SquareButton';

type DesignedButtonProps = RoundedButtonProps | SquareButtonProps;
type ButtonProps = DesignedButtonProps & {
	buttonType: 'rounded' | 'square';
};

const Button = ({ buttonType, ...props }: ButtonProps) => {
	const { formState } = useFormContext();
	const { isValid } = formState;

	if (buttonType === 'rounded') {
		return <RoundedButton {...(props as RoundedButtonProps)} disabled={!isValid} />;
	}
	return <SquareButton {...(props as SquareButtonProps)} disabled={!isValid} />;
};

export default Button;
