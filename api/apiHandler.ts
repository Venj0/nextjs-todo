import { NextApiRequest, NextApiResponse } from 'next'

type HandlerFunction<T = { [K in string]: any }> = (req: NextApiRequest, res: NextApiResponse<T>) => void
type ApiMethods = 'get' | 'patch' | 'put' | 'post' | 'delete'

type ApiHandler = (arg: { [K in ApiMethods]?: HandlerFunction }) => HandlerFunction

export const ApiHandler: ApiHandler = (handler) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		console.log(req.query)
		const method = req.method?.toLowerCase() as ApiMethods
		if (!handler?.[method]) return res.status(405).end(`Method ${req.method} Not Allowed`)

		try {
			await handler[method]?.(req, res)
		} catch (err) {
			res.status(405).end(`Something went wrong!!!`)
		}
	}
}
