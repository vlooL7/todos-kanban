import { createLocalStorageStore } from 'shared/lib/storage'
import { TODOS_COLUMNS } from './constants'
import { TodosColumn } from './types'

export const { $store: $todosColumns, $pending: $todosColumnsPending } =
	createLocalStorageStore<TodosColumn[]>('todos-columns', TODOS_COLUMNS, {
		sync: true
	})
