import type { Todo, TodoCreated } from 'entities/todos-columns'

export type Form = {
	todo: Partial<Omit<Todo, keyof TodoCreated>> & TodoCreated
	todosColumnId?: string
}
