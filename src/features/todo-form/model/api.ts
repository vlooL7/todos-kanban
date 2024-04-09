import { createApi } from 'effector'
import { TodoInTodosColumn } from 'entities/todos-columns'
import { DeepPartial } from 'shared/types'
import { $form, $visible } from './stores'
import { Form } from './types'

export const dialogApi = createApi($visible, {
	open: () => true,
	openCreated: (_state, _payload: DeepPartial<Form>) => true,
	openEdited: (_state, _payload: TodoInTodosColumn) => true,
	close: () => false
})

export const formApi = createApi($form, {
	setTitle: (state, title: string): Form => ({
		...state,
		todo: { ...state.todo, title }
	}),
	setDescription: (state, description: string): Form => ({
		...state,
		todo: { ...state.todo, description }
	}),
	setTodoColumn: (state, todosColumnId: string): Form => ({
		...state,
		todosColumnId
	}),
	submit: state => state
})
