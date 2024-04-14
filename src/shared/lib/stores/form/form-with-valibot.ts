import * as v from 'valibot'
import { createFormStore } from './form'

export type CreateFormWithValibotStoreOptions<
	T extends object,
	ValidatedScheme extends v.BaseSchema,
	EditedScheme extends v.BaseSchema
> = {
	validatedScheme: ValidatedScheme
	editedScheme: EditedScheme
	isEdited(state: T): boolean
}

export const createFormWithValibotStore = <
	T extends object,
	ValidatedScheme extends v.BaseSchema,
	EditedScheme extends v.BaseSchema
>(
	defaultValue: T,
	{
		validatedScheme,
		editedScheme,
		isEdited
	}: CreateFormWithValibotStoreOptions<T, ValidatedScheme, EditedScheme>
) => {
	return createFormStore<T, v.Output<ValidatedScheme>, v.Output<EditedScheme>>(
		defaultValue,
		{
			validated: state => v.is(validatedScheme, state),
			edited: state => v.is(editedScheme, state),
			isEdited
		}
	)
}
