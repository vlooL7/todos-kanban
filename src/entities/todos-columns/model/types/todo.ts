import type { Todo } from '../schemes'

export type TodoCreated = Omit<Todo, 'id' | 'created_at'>

export type TodoUpdated = Pick<Todo, 'id'> & Partial<Omit<Todo, 'id'>>
