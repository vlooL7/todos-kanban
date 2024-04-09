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
	const [{ title, description }, formValidation, edited] = useUnit([
		model.$todo,
		model.$formValidation,
		model.$edited
	])
	const formApi = useUnit(model.formApi)

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
						onChangeText={formApi.setTitle}
						maxLength={150}
					/>
				</div>
				<div className="flex flex-col space-y-1.5 max-h-40">
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						placeholder="Description..."
						value={description}
						onChangeText={formApi.setDescription}
						maxLength={550}
					/>
				</div>
				<div className="flex flex-col space-y-1.5">
					<Label htmlFor="todos-column">Column</Label>
					<TodosColumnSelect id="todos-column" placeholder="Column for todo" />
				</div>
			</div>
			<DialogFooter className="flex justify-between">
				<DialogClose
					onClick={formApi.submit}
					disabled={!formValidation}
					asChild>
					<Button>{edited ? 'Save' : 'Create'}</Button>
				</DialogClose>
			</DialogFooter>
		</>
	)
}
