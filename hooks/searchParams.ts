'use client';

import { useSearchParams } from 'next/navigation';

import { SearchParamsKey } from '@/constants/searchparams';

export const useGetSearchParams = () => {
	const getSearchParams = (param: SearchParamsKey) => {
		const searchParams = useSearchParams();
		const searchParam = searchParams.get(param);
		return searchParam;
	};

	return { getSearchParams };
};
