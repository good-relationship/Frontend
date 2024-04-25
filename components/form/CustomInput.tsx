'use client';

import { cva } from 'class-variance-authority';
import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormName } from '@/types/form';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	countLimit?: number;
	variant: 'Line' | 'Full';
	name: FormName;
}

const inputVariants = cva(
	'border border-Gray-200 placeholder:text-Gray-300 text-Gray-500 typo-Body1 px-5 py-[15px] h-[56px] rounded-xl focus-within:border-Gray-500 focus-within:border-2 flex justify-between items-center',
	{
		variants: {
			variant: {
				Line: 'bg-Gray-200',
				Full: 'bg-Gray-100',
			},
		},
	},
);

const CustomInput = ({ countLimit, variant, placeholder, className, name, ...props }: CustomInputProps) => {
	const { register, formState } = useFormContext();
	const { errors } = formState;
	const [value, setValue] = useState('');

	const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		console.log(errors);
	};

	return (
		<div className={cn(inputVariants({ variant }), className, !!errors[name]?.message && 'border-Red')} {...props}>
			<Input
				value={value}
				placeholder={placeholder}
				{...register(name || '', {
					onChange: handleInputValueChange,
				})}
				autoComplete="off"
				className="bg-transparent"
			/>
			<span className={cn('text-Gray-400 typo-Caption1 min-w-fit', !countLimit && 'text-transparent')}>
				{value.length}/{countLimit} (공백포함)
			</span>
		</div>
	);
};

export default CustomInput;
