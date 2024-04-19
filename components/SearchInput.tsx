import Image from 'next/image';
import { InputHTMLAttributes } from 'react';

import SquareButton from '@/components/SquareButton';
import { Input } from '@/components/ui/input';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({ placeholder }: SearchInputProps) => {
	return (
		<div className="flex bg-Gray-100 px-5 h-[72px] items-center rounded-xl w-full">
			<div className="flex gap-5 flex-1">
				<Image src="/icons/search.svg" width={36} height={36} alt="search icon" />
				<Input className="bg-Gray-100" placeholder={placeholder} />
			</div>
			<SquareButton size="Small">검색</SquareButton>
		</div>
	);
};

export default SearchInput;
