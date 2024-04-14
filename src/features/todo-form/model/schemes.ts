import { TodoScheme } from 'entities/todos-columns'
import * as v from 'valibot'

export const FormEditedScheme = v.object({
	todo: TodoScheme,
	todosColumnId: v.string()
})

export type FormEdited = v.Output<typeof FormEditedScheme>

export const FormValidateScheme = v.object({
	todo: v.merge([
		TodoScheme,
		v.partial(v.pick(TodoScheme, ['id', 'created_at']))
	]),
	todosColumnId: v.string()
})

export type FormValidate = v.Output<typeof FormValidateScheme>
