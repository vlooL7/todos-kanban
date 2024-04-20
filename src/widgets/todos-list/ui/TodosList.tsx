import { useUnit } from 'effector-react'
import { todosModel } from 'entities/todos'

export const TodosList = () => {
	const todos = useUnit(todosModel.$todos)

	return (
		<div className="flex overflow-auto">
			<div className="flex flex-col gap-4 px-8 py-4 h-max">
				{todos.map(todo => {
					return (
						<p key={todo.id}>
							{todo.title} {new Date(todo.created_at).toDateString()}
						</p>
					)
				})}
			</div>
		</div>
	)
}
