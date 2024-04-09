import type { Todo, TodoCreated, TodoUpdated, TodosColumn } from '../types'

export const todosColumnUtils = {
	create(todosColumn: TodosColumn, todo: TodoCreated): TodosColumn {
		const created_at = new Date().toISOString()
		const id = created_at

		return {
			...todosColumn,
			todos: [...todosColumn.todos, { ...todo, id, created_at }]
		}
	},
	update(todosColumn: TodosColumn, todo: TodoUpdated) {
		return {
			...todosColumn,
			todos: todosColumn.todos.map(item =>
				item.id === todo.id ? { ...item, ...todo } : item
			)
		}
	},
	remove(todosColumn: TodosColumn, todo: Pick<Todo, 'id'>) {
		return {
			...todosColumn,
			todos: todosColumn.todos.filter(item => item.id !== todo.id)
		}
	},
	move(todosColumn: TodosColumn, todo: Pick<Todo, 'id'>, to: number) {
		const { todos } = todosColumn
		if (to < 0 || to >= todos.length) return todosColumn

		const todoIndex = todos.findIndex(item => item.id === todo.id)
		if (todoIndex === -1 || to === todoIndex) return todosColumn

		const todosWithMove = [...todos]
		todosWithMove.splice(todoIndex, 1)
		todosWithMove.splice(to, 0, todos[todoIndex])
		return {
			...todosColumn,
			todos: todosWithMove
		}
	}
}
