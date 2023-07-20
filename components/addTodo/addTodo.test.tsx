import { AddTodo } from '@/components/addTodo/addTodo'
import { render, screen } from '@testing-library/react'

const getList = () => {}

describe('Add todo', () => {
	it('render a component', () => {
		render(<AddTodo getList={getList} />)

		const addTodoBtn = screen.getByRole('button', {
			name: /Add Todo/i
		})
		expect(addTodoBtn).toBeInTheDocument()
	})
})
