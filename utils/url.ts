import { UrlType } from '@/constants/url';

export const getUrl =
	(baseUrl: string = '') =>
	(path: UrlType) =>
	(params: Record<string, string> = {}) => {
		const url = new URL(path, baseUrl);
		Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
		return url.toString();
	};

export const getApiUrl = getUrl(process.env.NEXT_PUBLIC_API_URL);
export const getPublicUrl = getUrl(process.env.NEXT_PUBLIC_URL);

export const isWorkspaceUrl = (url: string) => url.startsWith('/workspace');
export const isOnboardingUrl = (url: string) => url.startsWith('/onboarding');
