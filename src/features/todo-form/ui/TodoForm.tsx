import { useUnit } from 'effector-react'
import {
	Button,
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	Label,
	Textarea
} from 'shared/components'
import { model } from '../model'
import { TodosColumnSelect } from './TodosColumnSelect'

export const TodoForm = () => {
	const [{ title, description }, validation, edited, submit] = useUnit([
		model.$form,
		model.$validation,
		model.$edited,
		model.submit
	])
	const { updateByKey } = model.useUpdateByKey()

	return (
		<>
			<DialogHeader>
				<DialogTitle>{edited ? 'Edit todo' : 'Create todo'}</DialogTitle>
			</DialogHeader>
			<div className="grid w-full items-center gap-4">
				<div className="flex flex-col space-y-1.5">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						placeholder="Title your todo"
						value={title}
						onChangeText={updateByKey('title')}
						maxLength={150}
					/>
				</div>
				<div className="flex flex-col space-y-1.5 max-h-40">
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						placeholder="Description..."
						value={description}
						onChangeText={updateByKey('description')}
						maxLength={550}
					/>
				</div>
				<div className="flex flex-col space-y-1.5">
					<Label htmlFor="todos-column">Column</Label>
					<TodosColumnSelect id="todos-column" placeholder="Column for todo" />
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
