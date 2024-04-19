import { TodoCreatedScheme } from 'entities/todos'
import * as v from 'valibot'

export const FormValidateScheme = v.merge([
	TodoCreatedScheme,
	v.required(v.pick(TodoCreatedScheme, ['columnId']))
])

export type FormValidate = v.Output<typeof FormValidateScheme>
