import { ApiHandler } from '@/api/apiHandler'
import { todoRepo } from '@/api/todo.repo'
import type { NextApiRequest, NextApiResponse } from 'next'

export default ApiHandler({
	get: getById,
	put: edit,
	delete: removeById
})

async function edit(req: NextApiRequest, res: NextApiResponse) {
	const response = await todoRepo.update(req.query?.id as string, req.body)
	if (response === 'Ok') res.status(200).json({ status: 'OK' })
	else res.status(403).json({ message: response })
}

async function getById(req: NextApiRequest, res: NextApiResponse) {
	const response = await todoRepo.getById(req.query?.id as string)
	if (response) res.status(200).json(response)
	else res.status(403).json({ message: "Todo don't found!" })
}

async function removeById(req: NextApiRequest, res: NextApiResponse) {
	const response = await todoRepo.delete(req.query?.id as string)
	if (response === 'Ok') res.status(200).json({ status: 'OK' })
	else res.status(403).json({ message: "Todo don't found!" })
}
