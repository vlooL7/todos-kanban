import { createStore } from 'effector'
import { TodoScheme } from 'entities/todos'
import { createFormUpdateByKey, createFormValibotStore } from 'shared/lib'
import { FormValidateScheme } from './schemes'
import { Form } from './types'

export const $visible = createStore(false)

const form = createFormValibotStore<
	Form,
	typeof FormValidateScheme,
	typeof TodoScheme
>(
	{
		title: '',
		description: ''
	},
	{
		validatedScheme: FormValidateScheme,
		editedScheme: TodoScheme,
		isEdited: state => !!state.id
	}
)

export const { $form, $edited, $validation, create, save, submit } = form

export const { useUpdateByKey } = createFormUpdateByKey($form)
