import { ClassName } from '@/helpers/classname'
import CachedIcon from '@mui/icons-material/Cached'
import { Typography } from '@mui/material'
import React, { CSSProperties, FC, ReactNode } from 'react'

interface iProps {
	isLoading: boolean
	isFixed?: boolean
	color?: string
	className?: string
	size?: number
	style?: CSSProperties
	children?: ReactNode
	loadingStatus?: string
}

export const LoadingWrapper: FC<iProps> = ({ className, isFixed, style, isLoading, loadingStatus, children }) => (
	<div className={ClassName(`loading`, { fixed: isFixed, active: isLoading }, [className])} style={style}>
		{isLoading && (
			<div className={'loading-wrapper'} style={style}>
				<CachedIcon className={'loading-icon'} />

				{loadingStatus && (
					<Typography variant='h2' component='h2' align={'center'}>
						{' '}
						{loadingStatus}{' '}
					</Typography>
				)}
			</div>
		)}
		{children}
	</div>
)
