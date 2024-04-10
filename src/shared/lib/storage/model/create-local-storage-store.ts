import { createEffect, createEvent, createStore } from 'effector'
import { throttle } from 'patronum'
import {
	addEventListenerLocalStorage,
	createLocalStorage
} from '../local-storage'

type CreateLocalStorageStoreOptions = {
	sync?: boolean
}

export const createLocalStorageStore = <T>(
	key: string,
	defaultValue: T,
	{ sync }: CreateLocalStorageStoreOptions = { sync: false }
) => {
	const localStorage = createLocalStorage(key, defaultValue)

	const getValueFx = createEffect<void, T>(() => localStorage.get())

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
