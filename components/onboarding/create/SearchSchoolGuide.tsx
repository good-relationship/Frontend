import Image from 'next/image';

const SearchSchoolGuide = () => {
	return (
		<div className="flex items-center gap-5">
			<Image src="/images/e_commerce.png" alt="e_commerce" width="200" height="200" />
			<div className="flex flex-col items-start">
				<h6 className="typo-Header6 text-Gray-400">학교 검색</h6>
				<p className="typo-Body1 text-Gray-400">재학중인 대학교 이름을 검색해주세요.</p>
			</div>
		</div>
	);
};

export default SearchSchoolGuide;
