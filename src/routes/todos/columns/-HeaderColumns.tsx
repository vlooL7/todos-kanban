import { useUnit } from 'effector-react'
import { todoFormModel } from 'features/todo-form'
import { todosColumnFormModel } from 'features/todos-column-form'
import { CirclePlus, Columns4 } from 'lucide-react'
import { Button } from 'shared/components'
import { Header } from 'widgets/header'

export const HeaderColumns = () => {
	const todoDialogApi = useUnit(todoFormModel.dialogApi)
	const todosColumnDialogApi = useUnit(todosColumnFormModel.dialogApi)

	return (
		<Header>
			<Button className="flex gap-1" onClick={todoDialogApi.open}>
				<CirclePlus size="1em" /> Create todo
			</Button>
			<Button className="flex gap-1" onClick={todosColumnDialogApi.open}>
				<Columns4 size="1em" /> Create column
			</Button>
		</Header>
	)
}
