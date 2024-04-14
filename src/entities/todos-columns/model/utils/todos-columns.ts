import type { TodosColumn } from '../schemes'

export const todosColumnsUtils = {
	move(state: TodosColumn[], todosColumn: Pick<TodosColumn, 'id'>, to: number) {
		if (to < 0 || to >= state.length) return state

		const todosColumnIndex = state.findIndex(item => item.id === todosColumn.id)
		if (todosColumnIndex === -1 || to === todosColumnIndex) return state

		const todosColumns = [...state]
		todosColumns.splice(todosColumnIndex, 1)
		todosColumns.splice(to, 0, state[todosColumnIndex])
		return todosColumns
	}
}
