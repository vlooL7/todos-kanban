import mergeWith from 'lodash/mergeWith'
import set from 'lodash/set'

/** Updates the state and all objects to the key  */
export const updateValueWithParents = <T extends object>(
	state: T,
	key: string | number,
	value: unknown
): T => {
	const data = mergeWith(state, set({}, key, value), (prev, curr) => {
		if (Array.isArray(curr)) return [...curr]
		if (curr && typeof curr === 'object') return { ...prev, ...curr }
		return curr
	})
	return { ...data }
}
