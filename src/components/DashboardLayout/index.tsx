import type { PropsWithChildren } from 'react'

import { Role } from '@/types/user.types'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export default function DashboardLayout({
	children,
	role,
}: PropsWithChildren<{ role: Role }>) {
	return (
		<div className='grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr]'>
			<Sidebar role={role} />

			<main className='p-big-layout overflow-x-hidden max-h-screen relative'>
				<Header />
				{children}
			</main>
		</div>
	)
}
