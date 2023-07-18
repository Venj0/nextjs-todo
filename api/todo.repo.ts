import TodoModel from '@/api/db'
import { Todo } from '@/types/todo'

const TodoDB = TodoModel

export const todoRepo = {
	getAll,
	getById,
	create,
	update,
	delete: _delete
}

async function getAll(): Promise<Todo[]> {
	return (await TodoDB.find().sort({ updatedAt: -1 })).map((item) => ({
		id: item?._id.toString(),
		title: item?.title,
		description: item?.description,
		created: item?.updatedAt,
		status: item?.status
	}))
}

async function getById(id: string) {
	return await TodoDB.findById(id)
}

async function create(params: Partial<Todo>) {
	if (await TodoDB.findOne({ title: params.title })) {
		return `Title '${params.title}' is already taken`
	}

	const todo = new TodoDB(params)

	await todo.save()
	return 'Ok'
}

async function update(id: string, params: Partial<Todo>) {
	const todo = await TodoDB.findById(id)
	if (!todo) return 'Todo not found'
	Object.assign(todo, params)
	await todo.save()
	return 'Ok'
}

async function _delete(id: string) {
	await TodoDB.findByIdAndRemove(id)
	return 'Ok'
}
