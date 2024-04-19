import { apiErrorCatch } from '@/api/apiErrorCatch'
import { userService } from '@/services/user.service'
import { TypeUserForm } from '@/types/auth.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateSettings() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeUserForm) => userService.updateProfile(data),
		onSuccess() {
			toast.success('Successfully update profile!')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
		onError(error) {
			const err = apiErrorCatch(error)
			if (typeof err == 'string') {
				toast.error(err, { duration: 5000 })
				return
			}

			toast.error('Unexpected error. Sorry')
		},
	})

	return { mutate, isPending }
}
