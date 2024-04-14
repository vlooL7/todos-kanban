import { createLocalStorageStore } from 'shared/lib'
import { TODOS_COLUMNS } from './constants'
import type { TodosColumn } from './schemes'

export const { $store: $todosColumns, $pending: $todosColumnsPending } =
	createLocalStorageStore<TodosColumn[]>('todos-columns', TODOS_COLUMNS, {
		sync: true
	})
