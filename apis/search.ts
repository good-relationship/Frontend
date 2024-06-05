import { API_URLS } from '@/constants/url';
import { fetcher } from '@/utils/fetcher';
import { getApiUrl } from '@/utils/url';

export const searchSchoolName = async (schoolName: string) => {
	const url = getApiUrl(API_URLS.SEARCH_SCHOOL)({ name: schoolName });
	const fetch = await fetcher(url);
	return fetch;
};
