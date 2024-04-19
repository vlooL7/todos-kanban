import { createEffect, createEvent, createStore } from 'effector'
import { throttle } from 'patronum'
import {
	addEventListenerLocalStorage,
	createLocalStorage
} from 'shared/lib/storage'

type CreateLocalStorageStoreOptions<T> = {
	sync?: boolean
	prepareSet?: (state: T) => T
}

export const createLocalStorageStore = <T>(
	key: string,
	defaultValue: T,
	{ sync, prepareSet }: CreateLocalStorageStoreOptions<T> = { sync: false }
) => {
	const localStorage = createLocalStorage(key, defaultValue)

	const getValueFx = createEffect<void, T>(async () => localStorage.get())

	const $store = createStore(defaultValue).on(
		getValueFx.doneData,
		(state, value) => value ?? state
	)
	const $pending = getValueFx.pending

	let storeSkipStorageSet = 0
	getValueFx.done.watch(() => {
		$store.watch(value => {
			if (storeSkipStorageSet > 0) {
				storeSkipStorageSet--
				return
			}

			if (prepareSet) value = prepareSet(value)
			localStorage.set(value)
		})
	})

	getValueFx()

	if (sync) {
		const setStore = createEvent<T | null>()
		$store.on(throttle(setStore, 60), (state, value) => {
			storeSkipStorageSet++
			return value ?? state
		})

		addEventListenerLocalStorage(localStorage, setStore)
	}

	return { $store, $pending }
}
