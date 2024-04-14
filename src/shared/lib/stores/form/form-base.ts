import { StoreWritable, createEvent, createStore, sample } from 'effector'
import { and, not } from 'patronum'

export type CreateFormBaseStoreOptions<T extends object> = {
	isEdited(state: T): boolean
	$validation: StoreWritable<boolean>
}

export const createFormBaseStore = <
	T extends object,
	Created extends T = T,
	Edited extends T = T
>(
	defaultValue: T,
	{ isEdited, $validation }: CreateFormBaseStoreOptions<T>
) => {
	const update = createEvent<Partial<T>>()
	const reset = createEvent()

	const submit = createEvent()

	const $form = createStore(defaultValue)
		.on(update, (state, value) => ({
			...state,
			...value
		}))
		.reset(reset)

	const $edited = $form.map(isEdited)
	const $created = not($edited)

	const create = sample({
		clock: submit,
		source: $form as unknown as StoreWritable<Created>,
		filter: and($created, $validation)
	})

	const save = sample({
		clock: submit,
		source: $form as unknown as StoreWritable<Edited>,
		filter: and($edited, $validation)
	})

	return {
		$form,
		$validation,
		$created,
		$edited,
		create,
		save,
		update,
		reset,
		submit
	}
}
