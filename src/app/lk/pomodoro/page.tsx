import { Heading } from '@/components/ui/Heading'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import type { Metadata } from 'next'
import { Pomodoro } from './Pomodoro'

export const metadata: Metadata = {
	title: 'Pomodoro',
	...NO_INDEX_PAGE,
}

export default function PomodoroPage() {
	return (
		<div>
			<Heading title='Pomodoro' />
			<Pomodoro />
		</div>
	)
}
