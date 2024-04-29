import { ITimer, IUser, Role } from './user.types'

export interface IAuthForm {
	email: string
	password: string
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export interface IAuthToken {
	id: number
	role?: Role
	iat: number
	exp: number
}

export type TypeUserForm = Omit<IUser & ITimer, 'id'> & { password?: string }
