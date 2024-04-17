import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RoundedButtonProps extends VariantProps<typeof buttonVariants>, ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: ReactNode;
}

const buttonVariants = cva('rounded-[100px] h-fit w-fit', {
	variants: {
		size: {
			Small: 'gap-[10px] px-6 py-2 !typo-Body3 h-9',
			Medium: 'gap-2 px-6 py-4 !typo-Body1 h-10',
			Large: 'gap-[10px] px-8 py-3 !typo-SubHeader2 h-[56px]',
		},
		variant: {
			Black: 'bg-black text-white hover:text-Purple-300 disabled:bg-Gray-100 disabled:text-Gray-300',
			Purple: 'bg-Purple-300 text-black hover:bg-Purple-300 disabled:bg-Gray-100 disabled:text-Gray-300',
			Outline: 'border border-Gray-400 text-Gray-400 bg-white hover:bg-white disabled:text-Gray-300',
		},
	},
	defaultVariants: {
		size: 'Medium',
		variant: 'Black',
	},
});

const RoundedButton = ({ size, variant, className, children, ...props }: RoundedButtonProps) => {
	return (
		<Button className={cn(buttonVariants({ variant, size, className }))} {...props}>
			{children}
		</Button>
	);
};

export default RoundedButton;
