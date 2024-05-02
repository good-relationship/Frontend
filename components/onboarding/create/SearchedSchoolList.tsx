import React from 'react';
import { useRecoilState } from 'recoil';

import CustomedCheckbox from '@/components/CustomedCheckbox';
import SearchedSchoolListCount from '@/components/onboarding/create/SearchedSchoolListCount';
import { useSelectedSchoolName } from '@/hooks/schoolName';
import { searchSchoolNameState } from '@/stores/atoms/searchSchoolName';

const SearchedSchoolList = () => {
	const [searchSchoolName] = useRecoilState(searchSchoolNameState);
	const { schools, count } = searchSchoolName.results;

	const { isSelected, setSchoolName } = useSelectedSchoolName();

	return (
		<>
			<div className="w-full overflow-auto h-[calc(100vh-280px-60px-72px-40px-40px-20px-10px)]">
				{schools.map((school) => {
					const isChecked = isSelected(school);
					return (
						<CustomedCheckbox
							key={school}
							label={school}
							isChecked={isChecked}
							handleClick={setSchoolName}
						/>
					);
				})}
			</div>
			<SearchedSchoolListCount count={count} />
		</>
	);
};

export default SearchedSchoolList;
