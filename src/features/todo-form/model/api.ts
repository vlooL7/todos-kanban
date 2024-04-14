import { createApi } from 'effector'
import { TodoInTodosColumn } from 'entities/todos-columns'
import { DeepPartial } from 'shared/types'
import { $visible } from './stores'
import { Form } from './types'

export const dialogApi = createApi($visible, {
	open: () => true,
	openCreated: (_state, _payload: DeepPartial<Form>) => true,
	openEdited: (_state, _payload: TodoInTodosColumn) => true,
	close: () => false
})
