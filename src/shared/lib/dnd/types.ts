import type { Todo } from 'entities/todos'
import type { TodosColumn } from 'entities/todos-columns'

export enum DnDTypes {
	TODOS_COLUMN = 'TODOS_COLUMN',
	TODO_IN_TODOS_COLUMN = 'TODO_IN_TODOS_COLUMN'
}

export type TodosColumnDnDItem = Pick<TodosColumn, 'id'>
export type TodoInTodosColumnDnDItem = Pick<Todo, 'id' | 'columnId'>
