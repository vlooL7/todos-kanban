import { createApi } from 'effector'
import type { Todo } from 'entities/todos'
import { $visible } from './stores'
import { Form } from './types'
import { PartialDeep } from 'type-fest'

export const dialogApi = createApi($visible, {
	open: () => true,
	openCreated: (_state, _payload: PartialDeep<Form>) => true,
	openEdited: (_state, _payload: Todo) => true,
	close: () => false
})
