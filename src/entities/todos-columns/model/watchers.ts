import { sample } from 'effector'
import { todosModel } from 'entities/todos'
import { every, once, or } from 'patronum'
import { todosColumnsApi } from './api'
import { $todosColumns, $todosColumnsPending } from './stores'
import { todosToColumns } from './utils'

const { todosApi } = todosModel

sample({
	clock: or(todosModel.$todosPending, $todosColumnsPending),
	source: { todos: todosModel.$todos, columns: $todosColumns },
	filter: once(
		every({
			predicate: false,
			stores: [(todosModel.$todosPending, $todosColumnsPending)]
		})
	),
	fn: ({ todos, columns }) => todosToColumns(todos, columns),
	target: $todosColumns
})

sample({
	clock: todosApi.push,
	target: todosColumnsApi.push
})
