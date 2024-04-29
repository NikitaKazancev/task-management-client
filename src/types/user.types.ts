export interface ITimer {
	workInterval?: number
	breakInterval?: number
	intervalsCount?: number
}

export interface IUser {
	id: string
	name?: string
	email: string
	role: Role
}

export enum Role {
	USER = 'USER',
	ADMIN = 'ADMIN',
}
