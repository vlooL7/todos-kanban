import { createApi } from 'effector'
import { TodosColumn } from 'entities/todos-columns'
import { $form, $visible } from './stores'
import { Form } from './types'

export const dialogApi = createApi($visible, {
	open: () => true,
	openEdited: (_state, _payload: TodosColumn) => true,
	close: () => false
})

export const formApi = createApi($form, {
	setTitle: (state, title: string): Form => ({
		...state,
		title
	}),
	submit: state => state
})
