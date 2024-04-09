export type Todo = {
	id: string
	title: string
	description: string
	created_at: string
}

export type TodoCreated = Omit<Todo, 'id' | 'created_at'>

export type TodoRemoved = Pick<Todo, 'id'>

export type TodoUpdated = Pick<Todo, 'id'> & Partial<Omit<Todo, 'id'>>

export type TodoMove = Pick<Todo, 'id'>
