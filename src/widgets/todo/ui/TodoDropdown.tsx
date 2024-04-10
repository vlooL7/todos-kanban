import { useUnit } from 'effector-react'
import { Todo, todosColumnsModel } from 'entities/todos-columns'
import { todoFormModel } from 'features/todo-form'
import { CircleMinus, EllipsisVertical, Pencil } from 'lucide-react'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from 'shared/components'

export type TodoDropdownProps = {
	todosColumnId: string
	todo: Todo
}
export const TodoDropdown = ({ todosColumnId, todo }: TodoDropdownProps) => {
	const todoInTodosColumnApi = useUnit(todosColumnsModel.todoInTodosColumnApi)
	const todoDialogApi = useUnit(todoFormModel.dialogApi)

	const onEdit = () => todoDialogApi.openEdited({ todo, todosColumnId })
	const onRemove = () =>
		todoInTodosColumnApi.remove({ todoId: todo.id, todosColumnId })

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="sm" className="h-7 min-w-6 px-0">
					<EllipsisVertical size="1rem" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="max-w-[220px]">
					{todo.title}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
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
