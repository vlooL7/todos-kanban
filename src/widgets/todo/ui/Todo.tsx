import { todosModel } from 'entities/todos'
import { Grip } from 'lucide-react'
import { memo, useLayoutEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTodoDnD } from '../hooks'
import { TodoDropdown } from './TodoDropdown'

export type TodoProps = { todo: todosModel.Todo }
const TodoView = ({ todo }: TodoProps) => {
	const { title, description, created_at } = todo
	const ref = useRef<HTMLDivElement>(null)

	const { isMove, isDragging, drag, dragPreview, drop } = useTodoDnD(todo)

	useLayoutEffect(() => {
		dragPreview(drop(ref))
	}, [dragPreview, drop])

	return (
		<div
			ref={ref}
			className={twMerge(
				'flex flex-col gap-2 py-3 px-2 border-2 rounded-sm',
				isDragging && 'opacity-0',
				isMove && 'bg-sky-100'
			)}>
			<div className="flex flex-row gap-2 justify-between">
				<h3 className="font-semibold">{title}</h3>
				<TodoDropdown todo={todo} />
			</div>
			<p className="text-sm">{description}</p>
			<div className="flex items-center justify-between">
				<div ref={drag} data-handler-id={todo.id} role="handle">
					<Grip className="cursor-move" size="1em" />
				</div>
				<time className="text-slate-500 text-sm">
					{new Date(created_at).toLocaleString()}
				</time>
			</div>
		</div>
	)
}

export const Todo = memo(TodoView)
