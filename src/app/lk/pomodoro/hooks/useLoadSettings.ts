import { useProfile } from '@/hooks/useProfile'

export function useLoadSettings() {
	const { data } = useProfile()

	const workInterval = data?.timer.workInterval ?? 50
	const breakInterval = data?.timer.breakInterval ?? 10

	return { workInterval, breakInterval }
}
