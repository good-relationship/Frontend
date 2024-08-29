import { NextRequest, NextResponse } from 'next/server';

import { ACCESS_TOKEN } from '@/constants/storage';
import { UrlType } from '@/constants/url';
import { isOnboardingUrl, isWorkspaceUrl } from '@/utils/url';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

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

	const headers = new Headers(request.headers);
	headers.set('x-pathname', pathname);

	return NextResponse.next({
		request: {
			headers: headers,
		},
	});
}
