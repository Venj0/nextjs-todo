import { AddTodo } from '@/components/addTodo/addTodo'
import { LoadingWrapper } from '@/components/loadingwrapper/loadingwrapper'
import { TodoItem } from '@/components/todoItem'
import { useQuery } from '@/hooks/useQuery'
import { TodoServices } from '@/services/todo'
import { Todo } from '@/types/todo'
import DownloadIcon from '@mui/icons-material/Download'
import { Button, List, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const TodoList = () => {
	const route = useRouter()
	const [list, setList] = useState<Todo[]>([])

	const [getAllTodosFetch, getAllTodosStatus] = useQuery<Todo[]>(TodoServices.getAll)
	const [getAllTodosInFileFetch, getAllTodosInFileStatus] = useQuery<Todo[]>(TodoServices.getAllInFile)
	const isEmptyList = !list.length

	const onDownload = async () => {
		const res = await getAllTodosInFileFetch(null)
		if (res !== null) route.replace('/todos.csv')
	}

	const getList = async () => {
		const res = await getAllTodosFetch(null)
		if (res) setList(res)
	}

	useEffect(() => {
		;(async () => {
			if (!getAllTodosStatus.isFetched) await getList()
		})()
	}, [])

	return (
		<Grid container justifyContent={'center'} spacing={2}>
			<LoadingWrapper isLoading={getAllTodosStatus.isLoading || getAllTodosInFileStatus.isLoading} isFixed loadingStatus={'Getting ...'} />
			<Grid item justifyContent={'center'} xs={8}>
				<Typography variant='h2' component='h1' align={'center'}>
					{' '}
					Todo List{' '}
				</Typography>
			</Grid>

			<Grid item mt={4} xs={8} gap={2}>
				<Grid container justifyContent={'center'}>
					{isEmptyList && (
						<Typography variant='h3' color={'#888'} component='h3' align={'center'}>
							{' '}
							Todo List is empty{' '}
						</Typography>
					)}
				</Grid>

				<Grid container justifyContent={isEmptyList ? 'center' : 'flex-end'} wrap={'nowrap'} gap={2}>
					<AddTodo getList={getList} />
					{!isEmptyList && (
						<Button startIcon={<DownloadIcon />} variant='contained' onClick={onDownload}>
							Download List
						</Button>
					)}
				</Grid>
			</Grid>
			<Grid item xs={8}>
				<List>
					{list.map((item) => (
						<TodoItem key={item.title} data={item} getList={getList} />
					))}
				</List>
			</Grid>
		</Grid>
	)
}
