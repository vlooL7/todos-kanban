import { createApi } from 'effector'
import type { TodoPush, todosModel } from 'entities/todos'
import type { TodosColumn } from './schemes'
import { $todosColumns } from './stores'
import {
	TodoInTodosColumnMove,
	TodoInTodosColumnMoveFromTo,
	TodoInTodosColumnPushFromTo,
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

export const todoInTodosColumnApi = createApi($todosColumns, {
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
	},
	move(state, { todoId, columnId, to }: TodoInTodosColumnMove) {
		return state.map(item => {
			if (item.id !== columnId) return item
			return todosColumnUtils.move(item, todoId, to)
		})
	},
	moveFromTo(
		state,
		{
			todoFromId,
			todoToId,
			columnFromId,
			columnToId
		}: TodoInTodosColumnMoveFromTo
	) {
		if (todoFromId === todoToId) return state

		if (columnFromId === columnToId) {
			const todosColumn = todosColumnUtils.getTodosColumnWithTodo(state, {
				todoId: todoFromId,
				todosColumnId: columnFromId
			})
			if (!todosColumn) return state

			const to = todosColumn.todosColumn.todos.findIndex(
				item => item.id === todoToId
			)
			if (to === -1) return state

			const todosColumns = [...state]
			todosColumns[todosColumn.todosColumnIndex] = todosColumnUtils.move(
				todosColumn.todosColumn,
				todoFromId,
				to
			)

			return todosColumns
		}

		const todosColumnFrom = todosColumnUtils.getTodosColumnWithTodo(state, {
			todoId: todoFromId,
			todosColumnId: columnFromId
		})
		if (!todosColumnFrom) return state

		const todosColumnTo = todosColumnUtils.getTodosColumnWithTodo(state, {
			todoId: todoToId,
			todosColumnId: columnToId
		})
		if (!todosColumnTo) return state

		const todosColumns = [...state]

		todosColumns[todosColumnFrom.todosColumnIndex] = todosColumnUtils.remove(
			todosColumnFrom.todosColumn,
			{ id: todoFromId }
		)

		todosColumnTo.todosColumn.todos.unshift(todosColumnFrom.todo)
		todosColumns[todosColumnTo.todosColumnIndex] = todosColumnUtils.move(
			todosColumnTo.todosColumn,
			todoFromId,
			todosColumnTo.todoIndex + 1
		)

		return todosColumns
	},
	pushFromTo(
		state,
		{
			todoFromId,
			columnFromId: todosColumnFromId,
			columnToId: todosColumnToId
		}: TodoInTodosColumnPushFromTo
	) {
		if (todosColumnFromId === todosColumnToId) return state

		const todosColumnToIndex = state.findIndex(
			item => item.id === todosColumnToId
		)
		if (todosColumnToIndex === -1) return state
		const todosColumnTo = state[todosColumnToIndex]

		const todosColumnFrom = todosColumnUtils.getTodosColumnWithTodo(state, {
			todoId: todoFromId,
			todosColumnId: todosColumnFromId
		})
		if (!todosColumnFrom) return state

		const todosColumns = [...state]

		todosColumns[todosColumnFrom.todosColumnIndex] = todosColumnUtils.remove(
			todosColumnFrom.todosColumn,
			{ id: todoFromId }
		)

		todosColumns[todosColumnToIndex] = todosColumnUtils.push(
			todosColumnTo,
			todosColumnFrom.todo
		)

		return todosColumns
	}
})
