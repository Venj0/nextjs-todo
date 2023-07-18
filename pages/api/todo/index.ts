import { ApiHandler } from '@/api/apiHandler'
import { todoRepo } from '@/api/todo.repo'
import type { NextApiRequest, NextApiResponse } from 'next'

export default ApiHandler({
	post: create
})

async function create(req: NextApiRequest, res: NextApiResponse) {
	const response = await todoRepo.create(req.body)
	if (response === 'Ok') res.status(200).json({ status: 'OK' })
	else res.status(403).json({ message: response })
}
