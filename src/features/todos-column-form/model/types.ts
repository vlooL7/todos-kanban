import type { TodosColumn, TodosColumnCreated } from 'entities/todos-columns'

export type Form = Partial<Omit<TodosColumn, keyof TodosColumnCreated>> &
	TodosColumnCreated
