import { atom } from 'recoil';

import { SearchSchoolNameResponseDTO } from '@/models/search/response/searchSchoolNameResponseDTO';

type SearchSchoolNameStateType = {
	results: SearchSchoolNameResponseDTO;
	isSearched: boolean;
};

export const searchSchoolNameState = atom<SearchSchoolNameStateType>({
	key: 'searchSchoolNameState',
	default: {
		results: {
			schools: [],
			count: 0,
		},
		isSearched: false,
	},
});
