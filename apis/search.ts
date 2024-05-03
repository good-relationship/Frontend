import { useGetUrl } from '@/hooks/url';

export const searchSchoolName = async (schoolName: string) => {
	const { getSearchSchoolUrl } = useGetUrl();
	const response = await fetch(getSearchSchoolUrl(schoolName));
	if (!response.ok) {
		// TODO: 검색 에러 처리
		throw new Error('검색 에러');
	}

	const data = await response.json();

	return data;
};
