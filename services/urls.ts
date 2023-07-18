export const Urls = {
	getAllTodo: '/api/getAll',
	todo: (id?: string) => `/api/todo/${id || ''}`
}
