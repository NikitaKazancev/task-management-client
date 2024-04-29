import { NextRequest, NextResponse } from 'next/server'

import { jwtVerify } from 'jose'
import { DASHBOARD_PAGES } from './constants/pages-url.constants'
import { TokenTypes } from './services/auth-token.service'
import { IAuthToken } from './types/auth.types'
import { Role } from './types/user.types'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request

	const refreshToken = cookies.get(TokenTypes.REFRESH_TOKEN)?.value
	const accessToken = cookies.get(TokenTypes.ACCESS_TOKEN)?.value

	const isAdminPage = url.includes('/admin')
	const isAuthPage = url.includes('/auth')
	const isDashboardPage = url.includes('/lk')
	const isHomePage = !isAuthPage && !isDashboardPage

	let role = Role.USER
	if (accessToken) {
		try {
			const { payload }: { payload: IAuthToken } = await jwtVerify(
				accessToken,
				new TextEncoder().encode(`${process.env.JWT_SECRET}`)
			)

			if (payload.role) role = payload.role
		} catch (error) {
			console.error(error)
			return redirect('/auth', url, role)
		}
	} else {
		if (isAdminPage) {
			return redirect('/404', url, role)
		}
	}

	console.log(role)

	if ((isAuthPage || isHomePage) && refreshToken) {
		return redirect(DASHBOARD_PAGES.HOME, url, role)
	}

	if (isAdminPage) {
		if (role === Role.ADMIN) {
			return next(role)
		}

		return redirect('/404', url, role)
	}

	if (refreshToken) {
		return next(role)
	}

	if (isHomePage) {
		return redirect('/auth', url, role)
	}

	if (isAuthPage) {
		return next(role)
	}

	return redirect('/auth', url, role)
}

export const config = {
	matcher: ['/lk/:path*', '/auth/:path', '/'],
}

const next = (role: Role = Role.USER) => {
	if (role === Role.ADMIN) {
		const response = NextResponse.next()
		response.cookies.set('role', role)
		return response
	}

	return NextResponse.next()
}

const redirect = (path: string, url: string, role: Role = Role.USER) => {
	if (role === Role.ADMIN) {
		const response = NextResponse.redirect(new URL(path, url))
		response.cookies.set('role', role)
		return response
	}

	return NextResponse.redirect(new URL(path, url))
}
