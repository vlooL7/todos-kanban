import type { Todo, TodoCreated } from 'entities/todos'

export type Form = Partial<Omit<Todo, keyof TodoCreated>> & TodoCreated
