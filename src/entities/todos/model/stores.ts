import { createLocalStorageStore } from 'shared/lib'
import type { Todo } from './schemes'

export const { $store: $todos, $pending: $todosPending } =
	createLocalStorageStore<Todo[]>('todos', [], {
		sync: true
	})
