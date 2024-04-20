import { useUnit } from 'effector-react'
import { todoFormModel } from 'features/todo-form'
import { CirclePlus } from 'lucide-react'
import { Button } from 'shared/components'
import { Header } from 'widgets/header'

export const HeaderList = () => {
	const todoDialogApi = useUnit(todoFormModel.dialogApi)

	return (
		<Header>
			<Button className="flex gap-1" onClick={todoDialogApi.open}>
				<CirclePlus size="1em" /> Create todo
			</Button>
		</Header>
	)
}
