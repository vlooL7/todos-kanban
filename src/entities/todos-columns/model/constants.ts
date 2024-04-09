import { TodosColumn } from './types'

let todosColumnIndex = 0
const createTodosColumn = (
	params: Omit<TodosColumn, 'id' | 'created_at'>
): TodosColumn => {
	const created_at = new Date(Date.now() + ++todosColumnIndex).toISOString()
	const id = created_at

	return { ...params, id, created_at }
}

export const TODOS_COLUMNS: TodosColumn[] = [
	createTodosColumn({ title: 'Backlog', todos: [] }),
	createTodosColumn({ title: 'Processing', todos: [] }),
	createTodosColumn({ title: 'Done', todos: [] })
]
