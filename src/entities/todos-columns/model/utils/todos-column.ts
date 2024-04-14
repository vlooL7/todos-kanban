import type { Todo, TodosColumn } from '../schemes'
import type { TodoCreated, TodoUpdated } from '../types'

export const todosColumnUtils = {
	getTodosColumnWithTodo(
		state: TodosColumn[],
		{
			todoId,
			todosColumnId
		}: { todoId: Todo['id']; todosColumnId: TodosColumn['id'] }
	) {
		const todosColumnIndex = state.findIndex(item => item.id === todosColumnId)
		if (todosColumnIndex === -1) return
		const todosColumn = state[todosColumnIndex]

		const todoIndex = todosColumn.todos.findIndex(item => item.id === todoId)
		if (todoIndex === -1) return
		const todo = todosColumn.todos[todoIndex]

		return { todosColumnIndex, todosColumn, todoIndex, todo }
	},
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
	remove(todosColumn: TodosColumn, todoId: Todo['id']) {
		return {
			...todosColumn,
			todos: todosColumn.todos.filter(item => item.id !== todoId)
		}
	},
	push(todosColumn: TodosColumn, todo: Todo) {
		return {
			...todosColumn,
			todos: [...todosColumn.todos, todo]
		}
	},
	move(todosColumn: TodosColumn, todoId: Todo['id'], to: number) {
		const { todos } = todosColumn
		if (to < 0 || to >= todos.length) return todosColumn

		const todoIndex = todos.findIndex(item => item.id === todoId)
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
