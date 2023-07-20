import { LoadingWrapper } from '@/components/loadingwrapper/loadingwrapper'
import { TodoModal } from '@/components/todoModal'
import { getVisibleTime } from '@/helpers/getVisibleTime'
import { Notify } from '@/helpers/notify'
import { useModalStatus } from '@/hooks/useModalStatus'
import { useQuery } from '@/hooks/useQuery'
import { BaseOkResponse, EditCreate, TodoServices } from '@/services/todo'
import { Todo, TodoStatus } from '@/types/todo'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Divider, Grid, IconButton, ListItem, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { FC, MouseEvent, useState } from 'react'

const MyListItem = styled(ListItem)(() => ({
	borderRadius: 16,
	boxShadow: '0 0 8px #00000073',
	cursor: 'pointer',
	marginTop: 16
}))

interface TodoItem {
	data: Todo
	getList: () => void
}

const StatusMovings = {
	next: {
		[TodoStatus.todo]: TodoStatus.inProgress,
		[TodoStatus.inProgress]: TodoStatus.done,
		[TodoStatus.done]: TodoStatus.done
	},
	back: {
		[TodoStatus.todo]: TodoStatus.todo,
		[TodoStatus.inProgress]: TodoStatus.todo,
		[TodoStatus.done]: TodoStatus.inProgress
	}
}

const bgColors = {
	[TodoStatus.todo]: '#ffa879',
	[TodoStatus.inProgress]: '#feff5c',
	[TodoStatus.done]: '#c0ff33'
}

export const TodoItem: FC<TodoItem> = ({ data, getList }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const [isOpen, switcher] = useModalStatus()
	const [fetchRemove, fetchRemoveStatus] = useQuery<BaseOkResponse, string>(TodoServices.remove)
	const [fetchMove, fetchMoveStatus] = useQuery<BaseOkResponse, EditCreate>(TodoServices.edit)

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation()
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation()
		setAnchorEl(null)
	}
	const onEdit = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation()
		handleClose(event)
		switcher.on()
	}

	const onRemove = async (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation()
		handleClose(event)
		const res = await fetchRemove(data.id)
		if (res) {
			Notify.Success(`"${data.title}" deleted!`)
			await getList()
		}
	}

	const onMove = async (params: EditCreate) => {
		const res = await fetchMove(params)
		if (res) {
			Notify.Success(`"${data.title}" Moved!`)
			await getList()
		}
	}

	const onMoveToNext = async (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation()
		handleClose(event)

		await onMove({
			id: data.id,
			data: { status: StatusMovings.next[data.status] }
		})
	}

	const onMoveToBack = async (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation()
		handleClose(event)
		await onMove({
			id: data.id,
			data: { status: StatusMovings.back[data.status] }
		})
	}

	const created = getVisibleTime(data.created)
	return (
		<>
			<LoadingWrapper isLoading={fetchRemoveStatus.isLoading || fetchMoveStatus.isLoading} isFixed />
			<MyListItem onClick={onEdit} sx={{ backgroundColor: bgColors[data.status] }}>
				<Grid container alignItems={'center'} justifyContent={'space-between'} gap={2} wrap={'nowrap'}>
					<ListItemText primary={data.title} />
					<Typography>{data.status}</Typography>
					<Typography width={70} textAlign={'center'}>
						{created || '-'}
					</Typography>
					<Tooltip title='Actions'>
						<IconButton onClick={handleClick} size='small' aria-controls={open ? 'actions-menu' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined}>
							<MoreHorizIcon />
						</IconButton>
					</Tooltip>
				</Grid>
				<Menu
					anchorEl={anchorEl}
					id='actions-menu'
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				>
					<MenuItem onClick={onEdit}>edit</MenuItem>
					<Divider />
					{data.status !== TodoStatus.done && <MenuItem onClick={onMoveToNext}>move to next</MenuItem>}
					{data.status !== TodoStatus.todo && <MenuItem onClick={onMoveToBack}>move to back</MenuItem>}

					<Divider />

					<MenuItem onClick={onRemove}>delete</MenuItem>
				</Menu>
			</MyListItem>
			<TodoModal
				{...{
					isOpen,
					handleClose: switcher.off,
					data,
					getList
				}}
			/>
		</>
	)
}
