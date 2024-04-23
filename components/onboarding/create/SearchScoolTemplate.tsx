'use client';

import CreateProgressNav from '@/components/onboarding/create/CreateProgressNav';
import SearchedSchoolList from '@/components/onboarding/create/SearchedSchoolList';
import SearchInput from '@/components/SearchInput';
import SquareButton from '@/components/SquareButton';

const SearchScoolTemplate = () => {
	// const [isSearched, setIsSearched] = useState(false);

	const renderSchoolList = () => {
		// if (!isSearched) {
		// 	return <SearchSchoolGuide />;
		// }

		return <SearchedSchoolList />;
	};

	return (
		<main className="flex-col-template">
			<CreateProgressNav />
			<div className="w-full flex flex-col gap-5">
				<SearchInput placeholder="학교 이름을 입력하세요" />
				{renderSchoolList()}
				<div className="flex justify-end w-full relative bottom-[50px]">
					<SquareButton variant="Black" size="Small" disabled>
						다음
					</SquareButton>
				</div>
			</div>
		</main>
	);
};

export default SearchScoolTemplate;
