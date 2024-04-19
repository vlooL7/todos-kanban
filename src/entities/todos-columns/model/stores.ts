import { createLocalStorageStore } from 'shared/lib'
import { TODOS_COLUMNS } from './constants'
import { TodosColumns } from './types'

export const { $store: $todosColumns, $pending: $todosColumnsPending } =
	createLocalStorageStore<TodosColumns>('todos-columns', TODOS_COLUMNS, {
		prepareSet(state) {
			return state.map(item => ({ ...item, todos: [] }))
		}
	})
