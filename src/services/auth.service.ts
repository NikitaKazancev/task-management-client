import { axiosClassic } from '@/api/interceptors'
import { IAuthForm, IAuthResponse } from '@/types/auth.types'
import {
	removeRoleFromCookie,
	removeTokenFromCookie,
	saveTokenToCookie,
} from './auth-token.service'

export const authService = {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data.accessToken)
			saveTokenToCookie(response.data.accessToken)

		return response
	},

	async register(data: IAuthForm) {
		return await this.main('register', data)
	},

	async login(data: IAuthForm) {
		return await this.main('login', data)
	},

	async findNewToken() {
		const response = await axiosClassic.post('/auth/login/access-token')

		if (response.data.accessToken)
			saveTokenToCookie(response.data.accessToken)

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) {
			removeTokenFromCookie()
			removeRoleFromCookie()
		}

		return response
	},
}
