import { createApi } from 'effector'
import type { TodoChangeColumn, TodoPush, todosModel } from 'entities/todos'
import type { TodosColumn } from './schemes'
import { $todosColumns } from './stores'
import {
	TodosColumnCreated,
	TodosColumnMove,
	TodosColumnMoveAfter,
	TodosColumnRemoved,
	TodosColumnUpdated
} from './types'
import { todosColumnUtils, todosColumnsUtils } from './utils'

export const todosColumnsApi = createApi($todosColumns, {
	create(state, todosColumn: TodosColumnCreated) {
		const created_at = new Date().toISOString()
		const id = created_at
		return [...state, { ...todosColumn, id, created_at }]
	},
	update(state, todosColumn: TodosColumnUpdated) {
		return state.map(item =>
			item.id === todosColumn.id ? { ...item, ...todosColumn } : item
		)
	},
	remove(state, todosColumn: TodosColumnRemoved) {
		return state.filter(item => item.id !== todosColumn.id)
	},
	move(state, { to, todosColumn }: TodosColumnMove) {
		return todosColumnsUtils.move(state, todosColumn, to)
	},
	moveAfter(state, { todosColumn, todosColumnAfter }: TodosColumnMoveAfter) {
		if (todosColumn.id === todosColumnAfter.id) return state

		const to = state.findIndex(item => item.id === todosColumnAfter.id)
		return todosColumnsUtils.move(state, todosColumn, to)
	}
})

export const _todoInTodosColumnApi = createApi($todosColumns, {
	push(state, todos: TodoPush) {
		const todosMap = new Map<TodosColumn['id'], todosModel.Todo[]>()

		const todosFlat = [todos].flat()
		todosFlat.forEach(todo => {
			if (!todo.columnId) return
			if (todosMap.has(todo.columnId)) todosMap.get(todo.columnId)!.push(todo)
			else todosMap.set(todo.columnId, [todo])
		})

		return state.map(item => {
			if (!todosMap.has(item.id)) return item
			return {
				...item,
				todos: item.todos.concat(todosMap.get(item.id)!)
			}
		})
	},
	update(state, todo: todosModel.TodoUpdated) {
		if (!todo.columnId) return state
		return state.map(item => {
			if (item.id !== todo.columnId) return item
			return todosColumnUtils.update(item, todo)
		})
	},
	remove(state, todo: todosModel.TodoRemoved) {
		if (!todo.columnId) return state
		return state.map(item => {
			if (item.id !== todo.columnId) return item
			return todosColumnUtils.remove(item, todo)
		})
	}
})

export const todoInTodosColumnApi = createApi($todosColumns, {
	changeColumn(
		state,
		{ todoFromId, todoToId, columnFromId, columnToId }: TodoChangeColumn
	) {
		if (todoFromId === todoToId) return state

		const columnFrom = todosColumnUtils.getTodosColumnWithTodo(state, {
			todoId: todoFromId,
			todosColumnId: columnFromId
		})
		if (!columnFrom) return state

		if (columnFromId === columnToId) {
			const { column, columnIndex, todo, todoIndex } = columnFrom

			const todoToIndex = todoToId
				? todosColumnUtils.getTodo(column, todoToId)?.todoIndex || 0
				: 0

			const columns = [...state]

			columns[columnIndex] = { ...column, todos: [...column.todos] }
			columns[columnIndex].todos.splice(todoIndex, 1)
			columns[columnIndex].todos.splice(todoToIndex, 0, todo)

			return columns
		}

		const columnTo = todosColumnUtils.getTodosColumn(state, columnToId)
		if (!columnTo) return state

		const todoToIndex = todoToId
			? todosColumnUtils.getTodo(columnTo.column, todoToId)?.todoIndex || 0
			: 0

		const columns = [...state]

		columns[columnFrom.columnIndex] = {
			...columnFrom.column,
			todos: [...columnFrom.column.todos]
		}
		columns[columnFrom.columnIndex].todos.splice(columnFrom.todoIndex, 1)

		columns[columnTo.columnIndex] = {
			...columnTo.column,
			todos: [...columnTo.column.todos]
		}
		columns[columnTo.columnIndex].todos.splice(todoToIndex, 0, {
			...columnFrom.todo,
			columnId: columnTo.column.id
		})

		return columns
	}
})
