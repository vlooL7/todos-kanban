import { Scope, StoreWritable, createEvent, scopeBind } from 'effector'
import { useProvidedScope } from 'effector-react'
import { updateValueWithParents } from 'shared/lib/utils'
import type { Get, Paths } from 'type-fest'

const formBaseUpdatedByKeyUndefined = {}

type GetPath<Key> = Key extends string | readonly string[] ? Key : never

export const createFormUpdateByKey = <T extends object>(
	$form: StoreWritable<T>
) => {
	const updateBy = createEvent<{ key: string | number; value: unknown }>()

	$form.on(updateBy, (state, { key, value }) => {
		return updateValueWithParents(state, key, value)
	})

	type PathsT = Paths<T>

	type UpdateByKeyValueFn<K extends PathsT> = (
		value: Get<T, GetPath<K>>
	) => void

	type UpdateByKeyFn<K extends PathsT> = (key: K) => UpdateByKeyValueFn<K>

	const memoUpdateByKeyFn = new WeakMap<
		Scope | typeof formBaseUpdatedByKeyUndefined,
		Map<boolean | undefined, UpdateByKeyFn<PathsT>>
	>()

	const createUpdateByKey = ({
		scope,
		safe
	}: Parameters<typeof scopeBind>[1] = {}): UpdateByKeyFn<PathsT> => {
		const scopeKeyFn = scope ?? formBaseUpdatedByKeyUndefined

		if (!memoUpdateByKeyFn.has(scopeKeyFn))
			memoUpdateByKeyFn.set(scopeKeyFn, new Map())
		const memoScope = memoUpdateByKeyFn.get(scopeKeyFn)!

		const keyUpdateByKeyFn = safe
		if (memoScope.has(keyUpdateByKeyFn)) return memoScope.get(keyUpdateByKeyFn)!

		const memoFn = new Map<string | number, UpdateByKeyValueFn<PathsT>>()

		const updateByKeyFn: UpdateByKeyFn<PathsT> = key => {
			if (!memoFn.has(key)) {
				if (scope) {
					const updateByBind = scopeBind(updateBy, { scope, safe })

					memoFn.set(key, value => {
						updateByBind({ key, value })
					})
				} else {
					memoFn.set(key, value => {
						updateBy({ key, value })
					})
				}
			}

			return memoFn.get(key)!
		}

		memoScope.set(keyUpdateByKeyFn, updateByKeyFn)
		return updateByKeyFn
	}

	const useUpdateByKey = (options?: Parameters<typeof scopeBind>[1]) => {
		const providedScope = useProvidedScope()

		const safe = options?.safe
		const scope = options?.scope ?? providedScope ?? undefined

		const updateByKey = createUpdateByKey({ scope, safe })
		return { updateByKey }
	}

	return { useUpdateByKey }
}
