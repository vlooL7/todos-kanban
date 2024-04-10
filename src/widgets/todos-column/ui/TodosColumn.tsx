import { todosColumnsModel } from 'entities/todos-columns'
import { Grip } from 'lucide-react'
import { memo, useLayoutEffect, useRef } from 'react'
import { Card, CardTitle } from 'shared/components'
import { twMerge } from 'tailwind-merge'
import { Todo } from 'widgets/todo'
import { useTodosColumnDnD } from '../hooks'
import { TodosColumnDropdown } from './TodosColumnDropdown'

export type TodosColumnProps = {
	todosColumn: todosColumnsModel.TodosColumn
}
const TodosColumnView = ({ todosColumn }: TodosColumnProps) => {
	const ref = useRef<HTMLDivElement>(null)

	const { isDragging, isOver, isTodoOver, drag, dragPreview, drop, dropTodo } =
		useTodosColumnDnD(todosColumn)

	useLayoutEffect(() => {
		dropTodo(drop(dragPreview(ref)))
	}, [dragPreview, drop, dropTodo])

	return (
		<div ref={ref}>
			<Card
				className={twMerge(
					'w-[300px] p-4',
					isDragging && 'opacity-50',
					isOver && 'bg-neutral-100',
					isTodoOver && 'border-sky-500'
				)}>
				<CardTitle className="flex text-md pb-2 justify-between items-center">
					<div className="flex justify-end items-center gap-2">
						<div ref={drag} role="handle">
							<Grip className="cursor-move" size="1em" />
						</div>
						{todosColumn.title}
					</div>
					<TodosColumnDropdown todosColumn={todosColumn} />
				</CardTitle>
				<div className="flex flex-col gap-2">
					{todosColumn.todos.map(todo => {
						return (
							<Todo key={todo.id} todosColumnId={todosColumn.id} todo={todo} />
						)
					})}
				</div>
			</Card>
		</div>
	)
}

export const TodosColumn = memo(TodosColumnView)
