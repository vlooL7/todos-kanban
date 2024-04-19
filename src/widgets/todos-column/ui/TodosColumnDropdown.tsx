import { useUnit } from 'effector-react'
import { TodosColumn, todosColumnsModel } from 'entities/todos-columns'
import { todoFormModel } from 'features/todo-form'
import { todosColumnFormModel } from 'features/todos-column-form'
import { CircleMinus, CirclePlus, EllipsisVertical, Pencil } from 'lucide-react'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from 'shared/components'

export type TodosColumnDropdownProps = {
	todosColumn: TodosColumn
}
export const TodosColumnDropdown = ({
	todosColumn
}: TodosColumnDropdownProps) => {
	const todoDialogApi = useUnit(todoFormModel.dialogApi)
	const todosColumnDialogApi = useUnit(todosColumnFormModel.dialogApi)
	const todosColumnsApi = useUnit(todosColumnsModel.todosColumnsApi)

	const onCreateTodo = () =>
		todoDialogApi.openCreated({ columnId: todosColumn.id })
	const onEdit = () => todosColumnDialogApi.openEdited(todosColumn)
	const onRemove = () => todosColumnsApi.remove({ id: todosColumn.id })

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="sm" className="h-7 min-w-6 px-0">
					<EllipsisVertical size="1rem" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="max-w-[220px]">
					{todosColumn.title}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex gap-1" onClick={onCreateTodo}>
					<CirclePlus size="1em" /> Create todo
				</DropdownMenuItem>
				<DropdownMenuItem className="flex gap-1" onClick={onEdit}>
					<Pencil size="1em" /> Edit
				</DropdownMenuItem>
				<DropdownMenuItem className="flex gap-1" onClick={onRemove}>
					<CircleMinus size="1em" /> Remove
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
