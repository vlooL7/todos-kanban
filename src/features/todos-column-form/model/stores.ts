import { createStore } from 'effector'
import {
	TodosColumnCreatedScheme,
	TodosColumnScheme
} from 'entities/todos-columns'
import { createFormUpdateByKey, createFormValibotStore } from 'shared/lib'
import { Form } from './types'

export const $visible = createStore(false)

const form = createFormValibotStore<
	Form,
	typeof TodosColumnCreatedScheme,
	typeof TodosColumnScheme
>(
	{
		title: '',
		todos: []
	},
	{
		validatedScheme: TodosColumnCreatedScheme,
		editedScheme: TodosColumnScheme,
		isEdited: state => !!state.id
	}
)

export const { $form, $edited, $validation, create, save, submit } = form

export const { useUpdateByKey } = createFormUpdateByKey($form)
