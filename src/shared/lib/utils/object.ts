export const keys = <T extends object>(o: T) => {
	return Object.keys(o) as (keyof T)[]
}

export const values = <T extends object>(o: T) => {
	return Object.values(o) as T[keyof T][]
}

export const entries = <T extends object>(o: T) => {
	return Object.entries(o) as { [key in keyof T]: [key, T[key]] }[keyof T][]
}
