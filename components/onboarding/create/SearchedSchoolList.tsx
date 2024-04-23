import React from 'react';

import CustomedCheckbox from '@/components/CustomedCheckbox';
import SearchedSchoolListCount from '@/components/onboarding/create/SearchedSchoolListCount';
import { mockSearchSchoolNameData } from '@/mocks/search';

const SearchedSchoolList = () => {
	const schoolList = mockSearchSchoolNameData;
	const { schools, count } = schoolList;

	return (
		<div className="w-full flex flex-col items-center">
			<div className="w-full h-[calc(100%-92px)] overflow-auto">
				{schools.map((school) => {
					return <CustomedCheckbox key={school} label={school} />;
				})}
			</div>
			<SearchedSchoolListCount count={count} />
		</div>
	);
};

export default SearchedSchoolList;
