import { combine, createStore, sample, Store } from 'effector'
import { and, not } from 'patronum'
import { createFormBaseStore, CreateFormBaseStoreOptions } from './form-base'

export type CreateFormStoreOptions<T extends object> = {
	validated(state: T): boolean
	edited(state: T): boolean
	$hasErrors?: Store<boolean>
	$pending?: Store<boolean>
} & Pick<CreateFormBaseStoreOptions<T>, 'isEdited'>

export const createFormStore = <
	T extends object,
	Created extends T = T,
	Edited extends T = T
>(
	defaultValue: T,
	{
		validated,
		edited,
		isEdited,
		$pending = createStore(false),
		$hasErrors = createStore(false)
	}: CreateFormStoreOptions<T>
) => {
	const $validation = createStore(false)

	const form = createFormBaseStore<T, Created, Edited>(defaultValue, {
		isEdited,
		$validation
	})

	const { $form, $edited } = form

	const $formValidation = combine({ form: $form, edited: $edited }, state => {
		return state.edited ? edited(state.form) : validated(state.form)
	})

	sample({
		source: and($formValidation, not(and($pending, $hasErrors))),
		target: $validation
	})

	return { ...form, $hasErrors, $pending }
}
