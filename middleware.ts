import { NextRequest, NextResponse } from 'next/server';

import { URLS, UrlType } from '@/constants/routings';
import { ACCESS_TOKEN } from '@/constants/storage';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const cookie = request.cookies.get(ACCESS_TOKEN);
	const token = cookie?.value;

	const protectedRoutes: UrlType[] = [
		URLS.WORKSPACE,
		URLS.WORKSPACE_MEETING,
		URLS.WORKSPACE_DOCUMENT,
		URLS.WORKSPACE_SCHEDULE,
		URLS.WORKSPACE_SETTING,
	];

	if (!token) {
		// TODO: token validation

		if (protectedRoutes.includes(pathname as UrlType)) {
			const absoluteURL = new URL('/login', request.nextUrl.origin);
			return NextResponse.redirect(absoluteURL.toString());
		}
	}
}
