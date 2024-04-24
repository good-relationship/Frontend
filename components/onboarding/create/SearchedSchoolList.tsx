import React from 'react';

import CustomedCheckbox from '@/components/CustomedCheckbox';
import SearchedSchoolListCount from '@/components/onboarding/create/SearchedSchoolListCount';
import { mockSearchSchoolNameData } from '@/mocks/search';

const SearchedSchoolList = () => {
	const schoolList = mockSearchSchoolNameData;
	const { schools, count } = schoolList;

	return (
		<>
			<div className="w-full overflow-auto h-[calc(100vh-280px-60px-72px-40px-40px-20px-10px)]">
				{schools.map((school) => {
					return <CustomedCheckbox key={school} label={school} />;
				})}
			</div>
			<SearchedSchoolListCount count={count} />
		</>
	);
};

export default SearchedSchoolList;
