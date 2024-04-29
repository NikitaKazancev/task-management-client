import type { PropsWithChildren } from 'react'

import DashboardLayout from '@/components/DashboardLayout'
import { Role } from '@/types/user.types'
import { cookies } from 'next/headers'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	let role = Role.USER
	if (cookies().get('role')?.value === 'ADMIN') {
		role = Role.ADMIN
	}
	console.log(role)

	return <DashboardLayout role={role}>{children}</DashboardLayout>
}
