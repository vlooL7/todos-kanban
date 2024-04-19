import type { TodosColumn } from '../schemes'

export type TodosColumns = TodosColumn[]

export type TodosColumnCreated = Omit<TodosColumn, 'id' | 'created_at'>

export type TodosColumnUpdated = Pick<TodosColumn, 'id'> &
	Partial<Omit<TodosColumn, 'id'>>

export type TodosColumnRemoved = Pick<TodosColumn, 'id'>

export type TodosColumnMove = {
	to: number
	todosColumn: Pick<TodosColumn, 'id'>
}

export type TodosColumnMoveAfter = {
	todosColumn: Pick<TodosColumn, 'id'>
	todosColumnAfter: Pick<TodosColumn, 'id'>
}
