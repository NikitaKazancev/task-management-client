'use client'

import Loader from '@/components/ui/Loader'
import { useProfile } from '@/hooks/useProfile'

export function Statistics() {
	const { data, isLoading } = useProfile()

	let statistics
	if (data?.tasks) {
		statistics = [
			{
				label: 'Tasks',
				value: data?.tasks.amount,
			},
			{
				label: 'Completed',
				value: data?.tasks.completed,
			},
			{
				label: 'Today',
				value: data?.tasks.today,
			},
			{
				label: 'On week',
				value: data?.tasks.onWeek,
			},
		]
	}

	return isLoading ? (
		<Loader />
	) : (
		<div className='grid grid-cols-4 gap-12 mt-7'>
			{statistics ? (
				statistics.map(statistic => (
					<div
						className='bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
						key={statistic.label}
					>
						<div className='text-xl'>{statistic.label}</div>
						<div className='text-3xl font-semibold'>
							{statistic.value}
						</div>
					</div>
				))
			) : (
				<div>Statistics not loaded!</div>
			)}
		</div>
	)
}
