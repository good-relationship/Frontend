import { NextRequest, NextResponse } from 'next/server';

import { UrlType } from '@/constants/routings';
import { ACCESS_TOKEN } from '@/constants/storage';
import { useGetUrl } from '@/hooks/url';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const { isOnboardingUrl, isWorkspaceUrl } = useGetUrl();
	const isProtectedUrl = isWorkspaceUrl(pathname as UrlType) || isOnboardingUrl(pathname as UrlType);

	const cookie = request.cookies.get(ACCESS_TOKEN);
	const token = cookie?.value;

	if (!token) {
		// TODO: token validation

		if (isProtectedUrl) {
			const absoluteURL = new URL('/login', request.nextUrl.origin);
			return NextResponse.redirect(absoluteURL.toString());
		}
	}
}
