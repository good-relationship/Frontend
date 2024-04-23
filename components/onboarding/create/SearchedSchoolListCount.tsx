type SearchedSchoolListCountType = {
	count: number;
};

const SearchedSchoolListCount = ({ count }: SearchedSchoolListCountType) => {
	return (
		<p className="typo-Body2 text-Gray-400">
			총 <span className="typo-Body1">{count}</span> 개가 검색되었습니다.
		</p>
	);
};

export default SearchedSchoolListCount;
