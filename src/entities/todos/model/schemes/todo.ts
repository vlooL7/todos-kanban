import * as v from 'valibot'

export const TodoScheme = v.object({
	id: v.string(),
	title: v.string([v.minLength(1)]),
	description: v.string(),
	created_at: v.string([v.isoDate()]),
	columnId: v.optional(v.string())
})

export const TodosScheme = v.array(TodoScheme)

export const TodoCreatedScheme = v.omit(TodoScheme, ['id', 'created_at'])

export const TodoPushScheme = v.union([TodoScheme, TodosScheme])

export const TodoRemovedScheme = v.pick(TodoScheme, ['id', 'columnId'])

export const TodoUpdatedScheme = v.merge([
	v.pick(TodoScheme, ['id']),
	v.partial(v.omit(TodoScheme, ['id', 'created_at']))
])

export const TodoChangeColumnScheme = v.object({
	todoFromId: v.string(),
	todoToId: v.optional(v.string()),
	columnFromId: v.string(),
	columnToId: v.string()
})

export type Todo = v.Output<typeof TodoScheme>
export type Todos = v.Output<typeof TodosScheme>
export type TodoCreated = v.Output<typeof TodoCreatedScheme>
export type TodoPush = v.Output<typeof TodoPushScheme>
export type TodoRemoved = v.Output<typeof TodoRemovedScheme>
export type TodoUpdated = v.Output<typeof TodoUpdatedScheme>
export type TodoChangeColumn = v.Output<typeof TodoChangeColumnScheme>
