import { userService } from '@/services/user.service'
import { IUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useUsers() {
	const data = useQuery({
		queryKey: ['users'],
		queryFn: () => userService.findAll(),
	})

	const [items, setItems] = useState<IUser[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems }
}
