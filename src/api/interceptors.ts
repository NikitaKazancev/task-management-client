import axios, { AxiosError, CreateAxiosDefaults } from 'axios'

import {
	getAccessToken,
	removeTokenFromCookie,
} from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'
import { apiErrorCatch } from './apiErrorCatch'

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		const err = apiErrorCatch(error)
		console.log(err)

		if (
			err === 'jwt expired' ||
			err === 'jwt must be provided' ||
			err === 'Unauthorized'
		) {
			try {
				await authService.findNewToken()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (!(error instanceof AxiosError)) {
					return
				}

				if (error.response?.status != 401) {
					return
				}

				removeTokenFromCookie()
			}
		}

		throw error
	}
)

export { axiosClassic, axiosWithAuth }
