import { Urls } from '@/services/urls'
import { Todo } from '@/types/todo'
import axios from 'axios'

export const getAllTodos = async (): Promise<Todo[]> => {
	const res = await axios.get<Todo[]>(`${Urls.getAllTodo}/?q="sdgasdg"`)
	return res.data
}
