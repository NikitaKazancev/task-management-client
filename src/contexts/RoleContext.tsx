import { Role } from '@/types/user.types'
import { createContext } from 'react'

const RoleContext = createContext(Role.USER)

export default RoleContext
