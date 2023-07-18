import { Todo } from '@/types/todo'
import mongoose from 'mongoose'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
const Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString)
mongoose.Promise = global.Promise

const schema = new Schema(
	{
		title: { type: String },
		description: { type: String, required: false },
		status: { type: String }
	},
	{
		timestamps: true
	}
)

const TodoModel = mongoose.models.todo ?? mongoose.model<Todo[]>('todo', schema)
export default TodoModel
