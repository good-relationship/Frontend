import Image from 'next/image';

const SearchSchoolGuide = () => {
	return (
		<div className="flex flex-col items-center">
			<Image src="/images/e_commerce.png" alt="e_commerce" width="210" height="210" />
			<p className="typo-SubHeader3">학교 검색</p>
			<p className="typo-Body1">재학중인 대학교 이름을 검색해주세요.</p>
		</div>
	);
};

export default SearchSchoolGuide;
