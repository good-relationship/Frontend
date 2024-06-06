import { UrlType } from '@/constants/url';

const getFullPath = (path: UrlType, dynamicPath: string) => {
	if (!dynamicPath) {
		return path;
	}
	return `${path}/${dynamicPath}`;
};

export const getUrl =
	(baseUrl: string = '') =>
	(path: UrlType) =>
	(dynamicPath: string = '') =>
	(params: Record<string, string> = {}) => {
		const url = new URL(getFullPath(path, dynamicPath), baseUrl);
		Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
		return url.toString();
	};

export const getApiUrl = getUrl(process.env.NEXT_PUBLIC_API_URL);
export const getPublicUrl = getUrl(process.env.NEXT_PUBLIC_URL);

export const isWorkspaceUrl = (url: string) => url.startsWith('/workspace');
export const isOnboardingUrl = (url: string) => url.startsWith('/onboarding');
