import type { Todo } from 'entities/todos'
import type { TodosColumn } from '../schemes'

export type TodoInTodosColumnMove = {
	todoId: Todo['id']
	columnId: TodosColumn['id']
	to: number
}

export type TodoInTodosColumnMoveFromTo = {
	todoFromId: Todo['id']
	todoToId: Todo['id']
	columnFromId: TodosColumn['id']
	columnToId: TodosColumn['id']
}

export type TodoInTodosColumnPushFromTo = {
	todoFromId: Todo['id']
	columnFromId: TodosColumn['id']
	columnToId: TodosColumn['id']
}
