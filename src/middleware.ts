import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from './constants/pages-url.constants'
import { TokenTypes } from './services/auth-token.service'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request

	const refreshToken = cookies.get(TokenTypes.REFRESH_TOKEN)?.value
	const isAuthPage = url.includes('/auth')
	const isDashboardPage = url.includes('/lk')
	const isHomePage = !isAuthPage && !isDashboardPage

	if (refreshToken && (isAuthPage || isHomePage)) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
	}

	if (refreshToken) {
		return NextResponse.next()
	}

	if (isHomePage) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	return NextResponse.redirect(new URL('/auth', request.url))
}

export const config = {
	matcher: ['/lk/:path*', '/auth/:path', '/'],
}
