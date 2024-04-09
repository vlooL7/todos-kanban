import { createEffect, createStore } from 'effector'
import { createLocalStorage } from '../local-storage'

export const createLocalStorageStore = <T>(key: string, defaultValue: T) => {
	const localStorage = createLocalStorage(key, defaultValue)

	const getValueFx = createEffect<void, T>(() => localStorage.get())

	const $store = createStore(defaultValue).on(
		getValueFx.doneData,
		(state, value) => value ?? state
	)
	const $pending = getValueFx.pending

	getValueFx.done.watch(() => {
		$store.watch(value => localStorage.set(value))
	})

	getValueFx()

	return { $store, $pending }
}
