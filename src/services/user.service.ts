import { TypeUserForm } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'
import { IUser } from '@/types/user.types'

export interface IProfileResponse {
	user: IUser
	tasks?: {
		amount: number
		completed: number
		today: number
		onWeek: number
	}
	timer: {
		userId: string
		workInterval: number
		breakInterval: number
		intervalsCount: number
	}
}

class UserService {
	private BASE_URL = '/current-user'

	async findProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)
		return response.data
	}

	async updateProfile(data: TypeUserForm) {
		const response = await axiosWithAuth.put(this.BASE_URL, data)

		console.log(response)
		return response.data
	}
}

export const userService = new UserService()
