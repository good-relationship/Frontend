'use client';

import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

import CreateProgressNav from '@/components/onboarding/create/CreateProgressNav';
import SearchedSchoolList from '@/components/onboarding/create/SearchedSchoolList';
import SearchSchoolGuide from '@/components/onboarding/create/SearchSchoolGuide';
import SearchInput from '@/components/SearchInput';
import SquareButton from '@/components/SquareButton';
import { useSearchSchoolName } from '@/hooks/search';
import { searchSchoolNameState } from '@/stores/atoms/searchSchoolName';
import { selectedSchoolNameState } from '@/stores/atoms/selectedSchoolName';
import { isSelectedSchoolNameExistState } from '@/stores/selectors/isSelectedSchoolNameExist';

const SearchScoolTemplate = () => {
	const searchSchoolName = useRecoilValue(searchSchoolNameState);
	const { isSearched } = searchSchoolName;
	const { searchSchoolNameAndGetResults } = useSearchSchoolName();

	const isSchoolNameSelected = useRecoilValue(isSelectedSchoolNameExistState);
	const selectedSchoolName = useRecoilValue(selectedSchoolNameState);
	const router = useRouter();

	const handleClickNext = () => {
		router.push(`${window.location}?school=${selectedSchoolName}`);
	};

	const renderSchoolList = () => {
		if (!isSearched) {
			return <SearchSchoolGuide />;
		}

		return <SearchedSchoolList />;
	};

	return (
		<main className="flex-col-template">
			<CreateProgressNav />
			<div className="w-full flex flex-col gap-5 h-full">
				<SearchInput placeholder="학교 이름을 입력하세요" searchHandler={searchSchoolNameAndGetResults} />
				<div className="w-full flex flex-col items-center h-full">{renderSchoolList()}</div>
				<div className="flex justify-end w-full relative bottom-0">
					<SquareButton
						variant="Black"
						size="Small"
						disabled={!isSchoolNameSelected}
						onClick={handleClickNext}
					>
						다음
					</SquareButton>
				</div>
			</div>
		</main>
	);
};

export default SearchScoolTemplate;
