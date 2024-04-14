import { combine, createStore, sample, Store } from 'effector'
import { and, not } from 'patronum'
import * as v from 'valibot'
import { createFormBaseStore, CreateFormBaseStoreOptions } from './form-base'

export type CreateFormValibotStoreOptions<
	T extends object,
	ValidatedScheme extends v.BaseSchema,
	EditedScheme extends v.BaseSchema
> = {
	editedScheme: EditedScheme
	validatedScheme: ValidatedScheme
	isEdited(state: T): boolean
	$pending?: Store<boolean>
} & Pick<CreateFormBaseStoreOptions<T>, 'isEdited'>

export const createFormValibotStore = <
	T extends object,
	ValidatedScheme extends v.BaseSchema,
	EditedScheme extends v.BaseSchema
>(
	defaultValue: T,
	{
		validatedScheme,
		editedScheme,
		isEdited,
		$pending = createStore(false)
	}: CreateFormValibotStoreOptions<T, ValidatedScheme, EditedScheme>
) => {
	type vCreated = v.Output<typeof validatedScheme>
	type vEdited = v.Output<typeof editedScheme>

	type Created = T extends vCreated ? vCreated : never
	type Edited = T extends vEdited ? vEdited : never

	const $errors = createStore<v.SchemaIssue[] | null>(null)

	const $showErrors = createStore(false)

	const $hasErrors = $errors.map(state => {
		if (Array.isArray(state)) return state.length > 0
		return state !== null
	})

	const $validation = createStore(false)

	const form = createFormBaseStore<T, Created, Edited>(defaultValue, {
		$validation,
		isEdited
	})

	const { $form, $edited, submit } = form

	const $validationResult = combine({ isEdited: $edited, form: $form }).map(
		state => {
			return state.isEdited
				? v.safeParse(editedScheme, state.form)
				: v.safeParse(validatedScheme, state.form)
		}
	)

	sample({
		clock: $validationResult,
		fn: ({ issues }) => issues?.flat() ?? null,
		target: $errors
	})

	sample({
		source: and(
			$validationResult.map(state => state.success),
			not(and($pending, $hasErrors))
		),
		target: $validation
	})

	sample({
		clock: submit,
		source: not($validation),
		target: $showErrors
	})

	sample({
		clock: $form.updates,
		source: not($validation),
		target: $showErrors
	})

	return {
		...form,
		$errors,
		$pending,
		$hasErrors
	}
}
