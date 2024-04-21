import { TodoScheme } from 'entities/todos'
import * as v from 'valibot'

export const TodosColumnScheme = v.object({
	id: v.string(),
	title: v.string([v.minLength(1)]),
	created_at: v.string([v.isoTimestamp()]),
	todos: v.array(TodoScheme)
})

export const TodosColumnCreatedScheme = v.omit(TodosColumnScheme, [
	'id',
	'created_at'
])

export type TodosColumn = v.Output<typeof TodosColumnScheme>
export type TodosColumnCreated = v.Output<typeof TodosColumnCreatedScheme>
