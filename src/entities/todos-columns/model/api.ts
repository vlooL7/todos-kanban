import { createApi } from 'effector'
import { $todosColumns } from './stores'
import {
	TodoInTodosColumnCreated,
	TodoInTodosColumnMove,
	TodoInTodosColumnRemoved,
	TodoInTodosColumnUpdated,
	TodosColumnCreated,
	TodosColumnMove,
	TodosColumnRemoved,
	TodosColumnUpdated
} from './types'
import { todosColumnUtils } from './utils'

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
		if (to < 0 || to >= state.length) return state

		const todosColumnIndex = state.findIndex(item => item.id === todosColumn.id)
		if (todosColumnIndex === -1 || to === todosColumnIndex) return state

		const todosColumns = [...state]
		todosColumns.splice(todosColumnIndex, 1)
		todosColumns.splice(to, 0, state[todosColumnIndex])
		return todosColumns
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
	remove(state, { todo, todosColumnId }: TodoInTodosColumnRemoved) {
		return state.map(item => {
			if (item.id !== todosColumnId) return item
			return todosColumnUtils.remove(item, todo)
		})
	},
	move(state, { todo, todosColumnId, to }: TodoInTodosColumnMove) {
		return state.map(item => {
			if (item.id !== todosColumnId) return item
			return todosColumnUtils.move(item, todo, to)
		})
	}
})
