import { TodosColumnScheme } from 'entities/todos-columns'
import * as v from 'valibot'

export const FormEditedScheme = TodosColumnScheme

export type FormEdited = v.Output<typeof FormEditedScheme>

export const FormValidateScheme = v.merge([
	TodosColumnScheme,
	v.partial(v.pick(TodosColumnScheme, ['id', 'created_at']))
])

export type FormValidate = v.Output<typeof FormValidateScheme>
