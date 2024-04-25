import { useRecoilState } from 'recoil';

import { mockSearchSchoolNameData } from '@/mocks/search';
import { searchSchoolNameState } from '@/stores/atoms/searchSchoolName';

export const useSearchSchoolName = () => {
	const [, setSearchSchoolName] = useRecoilState(searchSchoolNameState);

	const searchSchoolNameAndGetResults = (value: string) => {
		// TODO: 검색 API 호출 및 결과 저장 변경
		console.log(value);
		setSearchSchoolName({
			results: mockSearchSchoolNameData,
			isSearched: true,
		});
	};

	const removeSearchResults = () => {
		setSearchSchoolName({
			results: {
				schools: [],
				count: 0,
			},
			isSearched: false,
		});
	};

	return { searchSchoolNameAndGetResults, removeSearchResults };
};
