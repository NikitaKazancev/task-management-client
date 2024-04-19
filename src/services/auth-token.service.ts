import Cookies from 'js-cookie'

export enum TokenTypes {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(TokenTypes.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokenToCookie = (accessToken: string) => {
	Cookies.set(TokenTypes.ACCESS_TOKEN, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1,
	})
}

export const removeTokenFromCookie = () => {
	Cookies.remove(TokenTypes.ACCESS_TOKEN)
}
