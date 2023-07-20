import { TodoModal } from '@/components/todoModal'
import { useModalStatus } from '@/hooks/useModalStatus'
import { Todo, TodoStatus } from '@/types/todo'
import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { FC } from 'react'

const initNewTodo: Todo = {
	id: 'new',
	title: '',
	status: TodoStatus.todo
}

interface AddTodo {
	getList: () => void
}
export const AddTodo: FC<AddTodo> = ({ getList }) => {
	const [isOpen, switcher] = useModalStatus()

	return (
		<>
			<Button onClick={switcher.on} startIcon={<AddIcon />} variant={'outlined'}>
				Add Todo
			</Button>
			<TodoModal {...{ data: initNewTodo, getList, handleClose: switcher.off, isOpen }} />
		</>
	)
}
