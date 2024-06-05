import { useGetAccessToken } from '@/hooks/auth';

export const fetcher = async (
	url: string,
	auth = false,
	options: RequestInit = {
		headers: {
			'Content-Type': 'application/json',
		},
	},
) => {
	const headers = new Headers(options.headers);

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
