import { todosColumnsModel } from 'entities/todos-columns'
import { memo } from 'react'
import { TodoDropdown } from './TodoDropdown'

export type TodoProps = {
	todosColumnId: string
	todo: todosColumnsModel.Todo
}
const TodoView = ({ todosColumnId, todo }: TodoProps) => {
	const { title, description, created_at } = todo

	return (
		<div className="flex flex-col gap-2 py-3 px-2 border-2 rounded-sm">
			<div className="flex flex-row gap-2 justify-between">
				<h3 className="font-semibold">{title}</h3>
				<TodoDropdown todosColumnId={todosColumnId} todo={todo} />
			</div>
			<p className="text-sm">{description}</p>
			<time className="ml-auto text-slate-500 text-sm">
				{new Date(created_at).toLocaleString()}
			</time>
		</div>
	)
}

export const Todo = memo(TodoView)
