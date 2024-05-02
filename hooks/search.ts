import { useRecoilState } from 'recoil';

import { useSelectedSchoolName } from '@/hooks/schoolName';
import { searchSchoolNameState } from '@/stores/atoms/searchSchoolName';

export const useSearchSchoolName = () => {
	const [, setSearchSchoolName] = useRecoilState(searchSchoolNameState);
	const { removeSelectedSchoolName } = useSelectedSchoolName();

	const searchSchoolNameAndGetResults = async (value: string) => {
		removeSelectedSchoolName();
		const searchResult = await fetch(`/workspace/school?name=${value}`).then((res) => res.json());

		setSearchSchoolName({
			results: searchResult,
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
