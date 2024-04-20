import { useUnit } from 'effector-react'
import { todosColumnsModel } from 'entities/todos-columns'
import { ScrollArea } from 'shared/components'
import { TodosColumn } from 'widgets/todos-column'

export const TodosColumns = () => {
	const todosColumns = useUnit(todosColumnsModel.$todosColumns)

	return (
		<ScrollArea className="flex flex-1">
			<div className="flex flex-row items-start gap-4 px-8 py-4 h-max w-min mx-auto">
				{todosColumns.map(todoColumn => {
					return <TodosColumn key={todoColumn.id} todosColumn={todoColumn} />
				})}
			</div>
		</ScrollArea>
	)
}
