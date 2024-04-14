import { useUnit } from 'effector-react'
import {
	Button,
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	Label
} from 'shared/components'
import { model } from '../model'

export const TodosColumnForm = () => {
	const [{ title }, validation, edited, submit] = useUnit([
		model.$form,
		model.$validation,
		model.$edited,
		model.submit
	])
	const { updateByKey } = model.useUpdateByKey()

	return (
		<>
			<DialogHeader>
				<DialogTitle>{edited ? 'Edit column' : 'Create column'}</DialogTitle>
			</DialogHeader>
			<div className="grid w-full items-center gap-4">
				<div className="flex flex-col space-y-1.5">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						placeholder="Title your column"
						value={title}
						onChangeText={updateByKey('title')}
					/>
				</div>
			</div>
			<DialogFooter className="flex justify-between">
				<DialogClose onClick={submit} disabled={!validation} asChild>
					<Button>{edited ? 'Save' : 'Create'}</Button>
				</DialogClose>
			</DialogFooter>
		</>
	)
}
