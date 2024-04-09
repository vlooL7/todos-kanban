import { TodoCreated, TodoMove, TodoRemoved, TodoUpdated } from './todo'
import { TodosColumn } from './todos-column'

export type TodoInTodosColumn = {
	todo: TodoCreated
	todosColumnId: TodosColumn['id']
}

export type TodoInTodosColumnCreated = {
	todo: TodoCreated
	todosColumnId: TodosColumn['id']
}

export type TodoInTodosColumnRemoved = {
	todo: TodoRemoved
	todosColumnId: TodosColumn['id']
}

export type TodoInTodosColumnUpdated = {
	todo: TodoUpdated
	todosColumnId: TodosColumn['id']
}

export type TodoInTodosColumnMove = {
	todo: TodoMove
	todosColumnId: TodosColumn['id']
	to: number
}
