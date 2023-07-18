export enum TodoStatus {
	todo = 'Todo',
	inProgress = 'In progress',
	done = 'Done'
}

export type Todo = {
	id: string
	title: string
	description?: string
	created?: Date
	status: TodoStatus
}
