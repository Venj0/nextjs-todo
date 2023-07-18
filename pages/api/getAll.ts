import { ApiHandler } from '@/api/apiHandler'
import { todoRepo } from '@/api/todo.repo'
import type { NextApiRequest, NextApiResponse } from 'next'

const fs = require('fs')
const fastCSV = require('fast-csv')

async function getAll(req: NextApiRequest, res: NextApiResponse) {
	const todos = await todoRepo.getAll()
	if (req.query.isDownload) {
		const csv = fs.createWriteStream('public/todos.csv')
		fastCSV
			.write(todos, { headers: true })
			.on('finish', function () {
				res.status(200).json('<a href="/todos.csv" target="_blank" download="todos.csv" id="download-link">click here</a>' + '<script> document.getElementById("download-link").click()</script>')
			})
			.pipe(csv)
	} else {
		res.status(200).json(todos)
	}
}

export default ApiHandler({
	get: getAll
})
