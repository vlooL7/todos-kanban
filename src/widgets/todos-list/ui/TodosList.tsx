import { useUnit } from 'effector-react'
import { todosModel } from 'entities/todos'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from 'shared/components'

export const TodosList = () => {
	const todos = useUnit(todosModel.$todos)

	return (
		<Table className="h-max w-full">
			<TableHeader>
				<TableRow>
					<TableHead>Todo</TableHead>
					<TableHead>Created</TableHead>
					<TableHead>Method</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{todos.map(todo => (
					<TableRow key={todo.id}>
						<TableCell className="font-medium">{todo.title}</TableCell>
						<TableCell className="text-nowrap">
							{new Date(todo.created_at).toDateString()}
						</TableCell>
						<TableCell>{todo.description}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
