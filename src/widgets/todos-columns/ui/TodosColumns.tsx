import { useUnit } from 'effector-react'
import { todosColumnsModel } from 'entities/todos-columns'
import { TodosColumn } from 'widgets/todos-column'

export const TodosColumns = () => {
	const todosColumns = useUnit(todosColumnsModel.$todosColumns)

	return (
		<div className="flex flex-1 overflow-auto">
			<div className="flex flex-row items-start gap-4 px-8 py-4 h-max mx-auto">
				{todosColumns.map(todoColumn => {
					return <TodosColumn key={todoColumn.id} todosColumn={todoColumn} />
				})}
			</div>
		</div>
	)
}
