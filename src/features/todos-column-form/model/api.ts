import { createApi } from 'effector'
import { TodosColumn } from 'entities/todos-columns'
import { $visible } from './stores'

export const dialogApi = createApi($visible, {
	open: () => true,
	openEdited: (_state, _payload: TodosColumn) => true,
	close: () => false
})
