import { useUnit } from 'effector-react'
import { Dialog, DialogContent } from 'shared/components'
import { model } from '../model'
import { TodoForm } from './TodoForm'

export const TodoDialog = () => {
	const visible = useUnit(model.$visible)
	const dialogApi = useUnit(model.dialogApi)

	return (
		<Dialog
			open={visible}
			onOpenChange={value => {
				!value && dialogApi.close()
			}}>
			<DialogContent className="sm:max-w-md">
				<TodoForm />
			</DialogContent>
		</Dialog>
	)
}
