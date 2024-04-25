import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SquareButtonProps extends VariantProps<typeof buttonVariants>, ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: ReactNode;
}

const buttonVariants = cva('rounded-3 h-fit w-fit', {
	variants: {
		size: {
			Small: 'min-w-[100px] h-10 !typo-Body2',
			Medium1: 'h-10 text-center !typo-Body2',
			Medium2: 'h-[52px] min-w-[268px] !typo-Body2',
			Large: 'w-[600px] h-[56px] !typo-Body2',
		},
		variant: {
			Black: 'bg-black text-white hover:text-Purple-300 disabled:bg-Gray-200 disabled:text-Gray-300',
			Purple: 'bg-Purple-300 text-black hover:bg-Purple-300 disabled:bg-Purple-100 disabled:text-Purple-400',
			Outline: 'border border-Gray-400 text-Gray-400 bg-white hover:bg-white disabled:text-Gray-300',
			Gray1: 'bg-Gray-200 text-Gray-400 hover:bg-Gray-400 active:bg-Gray-400 disabled:bg-Gray-200 disabled:text-Gray-300',
			Gray2: 'bg-Gray-400 text-Gray-100 disabled:bg-Gray-200 text-Gray-300',
		},
	},
	defaultVariants: {
		size: 'Medium2',
		variant: 'Black',
	},
});

const SquareButton = ({ size, variant, className, children, ...props }: SquareButtonProps) => {
	return (
		<Button className={cn(buttonVariants({ variant, size, className }))} {...props}>
			{children}
		</Button>
	);
};
export default SquareButton;
