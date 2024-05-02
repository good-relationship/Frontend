import { API_URLS } from '@/constants/routings';

export const searchSchoolName = async (schoolName: string) => {
	const { SEARCH_SCHOOL } = API_URLS;
	const response = await fetch(SEARCH_SCHOOL(schoolName));
	if (!response.ok) {
		// TODO: 검색 에러 처리
		throw new Error('검색 에러');
	}

	const data = await response.json();

	return data;
};
