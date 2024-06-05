import { useGetAccessToken } from '@/hooks/auth';

const defaultHeaders = new Headers({
	'Content-Type': 'application/json',
});

export const fetcher = async (url: string, auth = false, options: RequestInit = {}) => {
	const headers = defaultHeaders;

	if (auth) {
		const accessToken = await useGetAccessToken();
		headers.set('Authorization', `Bearer ${accessToken}`);
	}

	const response = await fetch(url, {
		...options,
		headers: headers,
	});

	if (!response.ok) {
		throw new Error('fetch error');
	}

	return response.json();
};
