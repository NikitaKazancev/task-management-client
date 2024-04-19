class DASHBOARD {
	private root = '/lk'

	HOME = this.root
	TASKS = `${this.root}/tasks`
	HABITS = `${this.root}/habits`
	TIMER = `${this.root}/pomodoro`
	TIME_BLOCKING = `${this.root}/time-blocking`
	SETTINGS = `${this.root}/settings`
}

export const DASHBOARD_PAGES = new DASHBOARD()
