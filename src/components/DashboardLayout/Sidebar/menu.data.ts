import {
	CalendarRange,
	KanbanSquare,
	LayoutDashboard,
	LucideIcon,
	Settings,
	Timer,
	UsersRound,
} from 'lucide-react'

import { DASHBOARD_PAGES } from '@/constants/pages-url.constants'

export interface IMenuItem {
	link: string
	name: string
	icon: LucideIcon
}

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.HOME,
		name: 'Dashboard',
	},
	{
		icon: KanbanSquare,
		link: DASHBOARD_PAGES.TASKS,
		name: 'Tasks',
	},
	{
		icon: Timer,
		link: DASHBOARD_PAGES.TIMER,
		name: 'Pomodoro',
	},
	{
		icon: CalendarRange,
		link: DASHBOARD_PAGES.TIME_BLOCKING,
		name: 'Time blocking',
	},
	{
		icon: UsersRound,
		link: DASHBOARD_PAGES.ADMIN_USERS,
		name: 'Users',
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings',
	},
]
