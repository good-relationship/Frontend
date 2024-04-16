import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RoundedButtonProps extends VariantProps<typeof buttonVariants> {
	className?: string;
	children?: ReactNode;
}

const buttonVariants = cva('rounded-[100px] h-fit w-fit', {
	variants: {
		size: {
			Small: 'gap-[10px] px-6 py-2 !typo-Body4',
			Medium: 'gap-2 px-6 py-4 !typo-Body2',
			Large: 'gap-[10px] px-8 py-3 !typo-SubHeader2',
		},
		variant: {
			Black: 'bg-black text-white hover:text-Purple-300',
			Purple: 'bg-Purple-300 text-black hover:bg-Purple-300',
			Outline: 'border border-Gray-400 text-Gray-400 bg-white hover:bg-white',
			Disabled: 'bg-Gray-100 text-Gray-300 hover:bg-Gray-100',
			'Outline-Disabled': 'border border-Gray-200 text-Gray-300 bg-white hover:bg-white',
		},
	},
	defaultVariants: {
		size: 'Medium',
		variant: 'Black',
	},
});

const RoundedButton = ({ size, variant, className, children }: RoundedButtonProps) => {
	return <Button className={cn(buttonVariants({ variant, size, className }))}>{children}</Button>;
};

export default RoundedButton;
