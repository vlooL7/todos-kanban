import * as v from 'valibot'

export const TodoScheme = v.object({
	id: v.string(),
	title: v.string([v.minLength(1)]),
	description: v.string(),
	created_at: v.string([v.isoDate()])
})

export type Todo = v.Output<typeof TodoScheme>
