import * as v from 'valibot'
import { TodoScheme } from './todo'

export const TodosColumnScheme = v.object({
	id: v.string(),
	title: v.string([v.minLength(1)]),
	created_at: v.string([v.isoDate()]),
	todos: v.array(TodoScheme)
})

export type TodosColumn = v.Output<typeof TodosColumnScheme>
