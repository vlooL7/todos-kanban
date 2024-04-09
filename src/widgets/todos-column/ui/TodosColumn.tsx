import { Todo } from 'widgets/todo'
import { todosColumnsModel } from 'entities/todos-columns'
import { memo } from 'react'
import { Card, CardTitle } from 'shared/components'
import { TodosColumnDropdown } from './TodosColumnDropdown'

export type TodosColumnProps = {
	todosColumn: todosColumnsModel.TodosColumn
}
const TodosColumnView = ({ todosColumn }: TodosColumnProps) => {
	return (
		<Card className="w-[300px] p-4">
			<CardTitle className="flex text-md pb-2 justify-between">
				{todosColumn.title}
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
	)
}

export const TodosColumn = memo(TodosColumnView)
