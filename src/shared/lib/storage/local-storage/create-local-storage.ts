export const createLocalStorage = <T>(key: string, defaultValue: T) => {
	return {
		key,
		defaultValue: defaultValue satisfies Readonly<T>,
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

export const addEventListenerLocalStorage = <T>(
	storage: ReturnType<typeof createLocalStorage<T>>,
	onChange: (newValue: T | null) => void
) => {
	const storageListener = (e: StorageEvent) => {
		if (e.key !== storage.key) return
		if (e.newValue === null) {
			onChange(null)
			return
		}

		try {
			onChange(JSON.parse(e.newValue))
		} catch {}
	}

	window.addEventListener('storage', storageListener)
	return () => window.removeEventListener('storage', storageListener)
}
