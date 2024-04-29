'use client'

import { Role } from '@/types/user.types'
import { useDeleteUser } from './hooks/useDeleteUser'
import { useUsers } from './hooks/useUsers'
import styles from './index.module.scss'

export function Users() {
	const { items, setItems } = useUsers()
	const { deleteUser, isDeletePending } = useDeleteUser()

	return (
		<div className={styles.table}>
			<div className={styles.header}>
				<div>ID</div>
				<div>NAME</div>
				<div>EMAIL</div>
				<div>ROLE</div>
				<div></div>
			</div>

			<div className={styles.parentsWrapper}>
				{items?.map(item => {
					return (
						<div className={styles.row} key={item.id}>
							<div>{item.id}</div>
							<div>{item.name}</div>
							<div>{item.email}</div>
							<div>{item.role}</div>
							{item.role === Role.USER ? (
								<div onClick={() => deleteUser(item.id)}>
									<button className={styles.delete}>Delete</button>
								</div>
							) : (
								<div></div>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}
