export const createLocalStorage = <T>(key: string, defaultValue: T) => {
	return {
		get: (): T => {
			try {
				return JSON.parse(localStorage[key])
			} catch {
				return defaultValue
			}
		},
		set: (value: T) => {
			localStorage[key] = JSON.stringify(value)
		},
		remove: () => {
			delete localStorage[key]
		}
	}
}
