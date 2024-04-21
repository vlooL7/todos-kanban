import { sample } from 'effector'
import { todosModel } from 'entities/todos'
import { every, once, or } from 'patronum'
import { todoInTodosColumnApi, _todoInTodosColumnApi } from './api'
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
	target: _todoInTodosColumnApi.push
})

sample({
	clock: todosApi.update,
	target: _todoInTodosColumnApi.update
})

sample({
	clock: todosApi.remove,
	target: _todoInTodosColumnApi.remove
})

sample({
	clock: todosApi.changeColumn,
	target: todoInTodosColumnApi.changeColumn
})
