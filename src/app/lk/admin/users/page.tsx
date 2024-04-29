import { Heading } from '@/components/ui/Heading'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import type { Metadata } from 'next'
import { Users } from './Users'

export const metadata: Metadata = {
	title: 'Users',
	...NO_INDEX_PAGE,
}

export default function UsersPage() {
	return (
		<div>
			<Heading title='Users' />
			<Users />
		</div>
	)
}
