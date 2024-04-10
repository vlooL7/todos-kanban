import { Todo, TodoCreated, TodoUpdated } from './todo'
import { TodosColumn } from './todos-column'

export type TodoInTodosColumn = {
	todo: Todo
	todosColumnId: TodosColumn['id']
}

export type TodoInTodosColumnCreated = {
	todo: TodoCreated
	todosColumnId: TodosColumn['id']
}

export type TodoInTodosColumnRemoved = {
	todoId: Todo['id']
	todosColumnId: TodosColumn['id']
}

export type TodoInTodosColumnUpdated = {
	todo: TodoUpdated
	todosColumnId: TodosColumn['id']
}

export type TodoInTodosColumnMove = {
	todoId: Todo['id']
	todosColumnId: TodosColumn['id']
	to: number
}

export type TodoInTodosColumnMoveFromTo = {
	todoFromId: Todo['id']
	todoToId: Todo['id']
	todosColumnFromId: TodosColumn['id']
	todosColumnToId: TodosColumn['id']
}

export type TodoInTodosColumnPushFromTo = {
	todoFromId: Todo['id']
	todosColumnFromId: TodosColumn['id']
	todosColumnToId: TodosColumn['id']
}
