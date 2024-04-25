import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormName } from '@/types/form';

interface HelperTextType extends React.ParamHTMLAttributes<HTMLParagraphElement> {
	children?: ReactNode;
	name: FormName;
}

const Helpertext = ({ children, className, name, ...props }: HelperTextType) => {
	const { formState } = useFormContext();
	const { errors } = formState;

	return (
		<p className={cn('typo-Body4 h-5', className, !!errors[name]?.message && 'text-Red')} {...props}>
			{children || errors[name]?.message?.toString()}
		</p>
	);
};

export default Helpertext;
