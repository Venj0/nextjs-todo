import { Notify } from '@/helpers/notify'
import { AxiosError as BaseAxiosError } from 'axios'
import { useCallback, useState } from 'react'

interface iFetchStatus {
	isLoading: boolean
	isError: boolean
	isSuccess: boolean
	isFetched: boolean
	error: string
}

type AxiosError = BaseAxiosError<{ statusCode: number; message: string }>

export const useQuery = <TRes = any, TReq = null>(callback: (data: TReq) => Promise<TRes>): [(data: TReq) => Promise<TRes>, iFetchStatus] => {
	const [status, setStatus] = useState<iFetchStatus>({
		isLoading: false,
		isError: false,
		isSuccess: false,
		error: '',
		isFetched: false
	})

	const fetch = useCallback(async (data: TReq) => {
		setStatus((c) => ({ ...c, isLoading: true, isFetched: true }))
		try {
			const res = await callback(data)
			setStatus((c) => ({ ...c, isLoading: false, isSuccess: true }))
			return res
		} catch (e: any) {
			const { response } = e as AxiosError

			setStatus((c) => ({ ...c, isLoading: false, isError: true, error: e.message }))
			Notify.Error(response?.data.message)
			return null
		}
	}, [])

	return [fetch as (data: TReq) => Promise<TRes>, status]
}
