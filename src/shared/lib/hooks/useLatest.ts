import { useLayoutEffect, useRef } from 'react'

export const useLatest = <T>(state: T) => {
	const latest = useRef(state)

	useLayoutEffect(() => {
		latest.current = state
	}, [state])

	return latest
}
