import type { Todo, Todos } from 'entities/todos'
import type { TodosColumn } from '../schemes'

export const todosToColumns = (
	todos: Todos,
	columns: TodosColumn[]
): TodosColumn[] => {
	const todosMap = new Map<string, Todo[]>()

	todos.forEach(todo => {
		if (!todo.columnId) return
		if (todosMap.has(todo.columnId)) todosMap.get(todo.columnId)!.push(todo)
		else todosMap.set(todo.columnId, [todo])
	})

	return columns.map(todosColumn => {
		if (!todosMap.has(todosColumn.id)) return todosColumn
		return {
			...todosColumn,
			todos: todosMap.get(todosColumn.id)!
		}
	})
}
