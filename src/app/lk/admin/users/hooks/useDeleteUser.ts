import { userService } from '@/services/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteUser() {
	const queryClient = useQueryClient()

	const { mutate: deleteUser, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: string) => userService.deleteUserById(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['users'],
			})
		},
	})

	return { deleteUser, isDeletePending }
}
