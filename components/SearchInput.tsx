'use client';

import Image from 'next/image';
import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, useState } from 'react';

import SquareButton from '@/components/SquareButton';
import { Input } from '@/components/ui/input';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
	searchHandler: (value: string) => void;
}

const SearchInput = ({ placeholder, searchHandler }: SearchInputProps) => {
	const [value, setValue] = useState('');
	const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	// TODO: 검색 기능과 event 핸들러 연결
	const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			searchHandler(value);
		}
	};

	const isInputEmpty = value === '';

	return (
		<div className="flex bg-Gray-100 px-5 py-4 items-center rounded-xl w-full">
			<div className="flex gap-5 flex-1">
				<Image src="/icons/search.svg" width={36} height={36} alt="search icon" />
				<Input
					className="bg-Gray-100"
					placeholder={placeholder}
					value={value}
					onChange={handleInputValueChange}
					onKeyDown={handleOnKeyDown}
				/>
			</div>
			<SquareButton size="Small" disabled={isInputEmpty} onClick={() => searchHandler(value)}>
				검색
			</SquareButton>
		</div>
	);
};

export default SearchInput;
