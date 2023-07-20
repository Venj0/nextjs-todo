import { LoadingWrapper } from '@/components/loadingwrapper/loadingwrapper'
import { Notify } from '@/helpers/notify'
import { useQuery } from '@/hooks/useQuery'
import { BaseOkResponse, EditCreate, TodoServices } from '@/services/todo'
import { Todo, TodoStatus } from '@/types/todo'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, TextFieldVariants, Typography } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select/SelectInput'
import { ChangeEvent, FC, useEffect, useState } from 'react'

const initNewTodo: Todo = {
	id: 'new',
	title: '',
	status: TodoStatus.todo
}
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	boxShadow: 24,
	p: 4,
	backgroundColor: '#ffffff',
	borderRadius: '16px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	maxHeight: '90vh',
	overflow: 'hidden auto'
}

interface TodoModal {
	data: Todo
	isOpen: boolean
	handleClose: () => void
	getList: () => void
}

export const TodoModal: FC<TodoModal> = ({ data, isOpen, handleClose, getList }) => {
	const [todo, setTodo] = useState<Todo>(initNewTodo)
	const isNew = data.id === 'new'

	const [fetch, fetchStatus] = useQuery<BaseOkResponse, EditCreate>(isNew ? TodoServices.create : TodoServices.edit)

	useEffect(() => {
		setTodo(data)
	}, [isOpen])

	const canSave = todo.title && todo.status && (!isNew ? todo.status !== data.status || todo.title !== data.title || todo.description !== data.description : true)
	const onClose = () => {
		setTodo(initNewTodo)
		handleClose()
	}
	const onAddTodo = async () => {
		if (!canSave) return
		const params = {
			id: data.id,
			data: {
				...(todo.title !== data.title ? { title: todo.title } : {}),
				...(todo.description !== data.description ? { description: todo.description } : {}),
				...(todo.status !== data.status || isNew ? { status: todo.status } : {})
			}
		}
		const res = await fetch(params)
		if (res) {
			Notify.Success(`"${todo.title}" ${isNew ? 'created!' : 'edited!'}`)
			await getList()
		}

		onClose()
	}

	const onChange = (event: SelectChangeEvent | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, name: keyof Todo) => setTodo((current) => ({ ...current, [name]: event.target.value }))

	const getProps = (name: keyof Todo) => ({
		fullWidth: true,
		value: todo[name],
		id: `form-${name}`,
		variant: 'outlined' as TextFieldVariants,
		onChange: (e: SelectChangeEvent | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onChange(e, name)
	})

	return (
		<>
			<LoadingWrapper isLoading={fetchStatus.isLoading} loadingStatus={isNew ? 'Creating ...' : 'Editing ... '} isFixed />

			<Modal open={isOpen} onClose={onClose} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description'>
				<Box
					sx={{
						...style
					}}
				>
					<Typography id='parent-modal-title' variant='h3' component='h2' align={'center'}>
						{' '}
						{isNew ? 'Add new ' : 'Edit '} todo{' '}
					</Typography>

					<Grid container alignItems={'center'} justifyContent={'center'} spacing={2}>
						<Grid item xs={12}>
							<TextField label='Title' required {...getProps('title')} />
						</Grid>
						<Grid item xs={12}>
							<TextField label='Description' multiline maxRows={20} {...getProps('description')} />
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id='form-status-select-label'>Status</InputLabel>
								<Select labelId='form-status-select-label' id='form-status' label='Status' value={todo.status} onChange={(e) => onChange(e, 'status')}>
									<MenuItem value={TodoStatus.todo}>{TodoStatus.todo}</MenuItem>
									<MenuItem value={TodoStatus.inProgress}>{TodoStatus.inProgress}</MenuItem>
									<MenuItem value={TodoStatus.done}>{TodoStatus.done}</MenuItem>
								</Select>
							</FormControl>{' '}
						</Grid>
					</Grid>
					<Grid container alignItems={'center'} mt={2} justifyContent={'space-between'} wrap={'nowrap'}>
						<Grid item>
							<Button variant={'outlined'} onClick={onClose}>
								Cancel
							</Button>
						</Grid>
						<Grid item>
							<Button variant={'contained'} disabled={!canSave} onClick={onAddTodo}>
								{isNew ? 'Create' : 'Save changes'}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	)
}
