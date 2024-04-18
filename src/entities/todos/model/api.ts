import { createApi } from 'effector'
import * as v from 'valibot'
import {
	TodoCreatedScheme,
	TodoPushScheme,
	TodoRemovedScheme,
	TodoUpdatedScheme,
	type Todo,
	type TodoCreated,
	type TodoPush,
	type TodoRemoved,
	type TodoUpdated
} from './schemes'
import { $todos } from './stores'

export const todosApi = createApi($todos, {
	create(state, todo: TodoCreated): Todo[] {
		if (!v.is(TodoCreatedScheme, todo)) return state

		const created_at = new Date().toISOString()
		const id = created_at
		return [...state, { ...todo, id, created_at }]
	},
	push(state, todo: TodoPush) {
		if (!v.is(TodoCreatedScheme, TodoPushScheme)) return state

		return state.concat(todo)
	},
	remove(state, todo: TodoRemoved) {
		if (!v.is(TodoCreatedScheme, TodoRemovedScheme)) return state

		return state.filter(item => item.id !== todo.id)
	},
	update(state, todo: TodoUpdated) {
		if (!v.is(TodoCreatedScheme, TodoUpdatedScheme)) return state

		return state.map(item =>
			item.id === todo.id ? { ...item, ...todo } : item
		)
	}
})
