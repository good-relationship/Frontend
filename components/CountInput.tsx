'use client';

import { ChangeEvent, useState } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type CountInputProps = {
	label?: string;
	helperText?: string;
	className?: string;
	countLimit: number;
};

const CountInput = ({ label, helperText, className, countLimit }: CountInputProps) => {
	const [value, setValue] = useState('');
	const [count, setCount] = useState(0);
	const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		setCount(e.target.value.length);
	};

	return (
		<div className={cn(className, 'flex flex-col gap-2')}>
			<label className="typo-Body1 text-Gray-400">{label}</label>
			<div className="border border-Gray-200 placeholder:text-Gray-300 text-Gray-500 typo-Body1 px-5 py-[15px] h-[56px] rounded-xl focus-within:border-Gray-500 focus-within:border-2 flex justify-between items-center">
				<Input value={value} onChange={handleInputValueChange} className="" />
				<span className="text-Gray-400 typo-Caption1 min-w-fit">
					{count}/{countLimit} (공백포함)
				</span>
			</div>
			<p className="typo-Body4">{helperText}</p>
		</div>
	);
};

export default CountInput;
