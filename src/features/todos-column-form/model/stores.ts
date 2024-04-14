import { createStore } from 'effector'
import { createFormUpdateByKey, createFormValibotStore } from 'shared/lib'
import { FormEditedScheme, FormValidateScheme } from './schemes'
import { Form } from './types'

export const $visible = createStore(false)

const form = createFormValibotStore<
	Form,
	typeof FormValidateScheme,
	typeof FormEditedScheme
>(
	{
		title: '',
		todos: []
	},
	{
		validatedScheme: FormValidateScheme,
		editedScheme: FormEditedScheme,
		isEdited: state => !!state.id
	}
)

export const { $form, $edited, $validation, create, save, submit, $errors } =
	form

export const { useUpdateByKey } = createFormUpdateByKey($form)
