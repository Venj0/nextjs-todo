import { Urls } from '@/services/urls'
import { Todo } from '@/types/todo'
import axios from 'axios'

export type BaseOkResponse = {
	status: 'Ok'
}

export type EditCreate = { id: string; data: Partial<Todo> }

export const TodoServices = {
	getAll: async () => (await axios.get<Todo[]>(Urls.getAllTodo))?.data,
	getAllInFile: async () => (await axios.get<Todo[]>(`${Urls.getAllTodo}/?isDownload=true`))?.data,
	create: async ({ data }: EditCreate) => await axios.post<Partial<Todo>, BaseOkResponse>(`${Urls.todo()}`, data),
	getById: async (id: string) => await axios.get<Partial<Todo>, BaseOkResponse>(`${Urls.todo(id)}`),
	edit: async ({ id, data }: EditCreate) => await axios.put<Partial<Todo>, BaseOkResponse>(`${Urls.todo(id)}`, data),
	remove: async (id: string) => await axios.delete<Partial<Todo>, BaseOkResponse>(`${Urls.todo(id)}`)
}
