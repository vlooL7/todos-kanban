import { createApi } from 'effector'
import { $todosColumns } from './stores'
import {
	TodoInTodosColumnCreated,
	TodoInTodosColumnMove,
	TodoInTodosColumnMoveFromTo,
	TodoInTodosColumnPushFromTo,
	TodoInTodosColumnRemoved,
	TodoInTodosColumnUpdated,
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

export const todoInTodosColumnApi = createApi($todosColumns, {
	create(state, { todo, todosColumnId }: TodoInTodosColumnCreated) {
		return state.map(item => {
			if (item.id !== todosColumnId) return item
			return todosColumnUtils.create(item, todo)
		})
	},
	update(state, { todo, todosColumnId }: TodoInTodosColumnUpdated) {
		return state.map(item => {
			if (item.id !== todosColumnId) return item
			return todosColumnUtils.update(item, todo)
		})
	},
	remove(state, { todoId, todosColumnId }: TodoInTodosColumnRemoved) {
		return state.map(item => {
			if (item.id !== todosColumnId) return item
			return todosColumnUtils.remove(item, todoId)
		})
	},
	move(state, { todoId, todosColumnId, to }: TodoInTodosColumnMove) {
		return state.map(item => {
			if (item.id !== todosColumnId) return item
			return todosColumnUtils.move(item, todoId, to)
		})
	},
	moveFromTo(
		state,
		{
			todoFromId,
			todoToId,
			todosColumnFromId,
			todosColumnToId
		}: TodoInTodosColumnMoveFromTo
	) {
		if (todoFromId === todoToId) return state

		if (todosColumnFromId === todosColumnToId) {
			const todosColumn = todosColumnUtils.getTodosColumnWithTodo(state, {
				todoId: todoFromId,
				todosColumnId: todosColumnFromId
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
			todosColumnId: todosColumnFromId
		})
		if (!todosColumnFrom) return state

		const todosColumnTo = todosColumnUtils.getTodosColumnWithTodo(state, {
			todoId: todoToId,
			todosColumnId: todosColumnToId
		})
		if (!todosColumnTo) return state

		const todosColumns = [...state]

		todosColumns[todosColumnFrom.todosColumnIndex] = todosColumnUtils.remove(
			todosColumnFrom.todosColumn,
			todoFromId
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
			todosColumnFromId,
			todosColumnToId
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
			todoFromId
		)

		todosColumns[todosColumnToIndex] = todosColumnUtils.push(
			todosColumnTo,
			todosColumnFrom.todo
		)

		return todosColumns
	}
})
