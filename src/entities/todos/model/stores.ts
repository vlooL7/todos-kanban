import { createStore } from 'effector'
import type { Todo } from './schemes'

export const $todos = createStore<Todo[]>([])
