import { TodoDialog } from 'features/todo-form'
import { TodosColumnDialog } from 'features/todos-column-form'
import { TodosColumns } from 'widgets/todos-columns'
import { Header } from './Header'

export const TodosColumnsPage = () => {
	return (
		<>
			<div className="flex flex-col h-screen w-screen">
				<Header />
				<TodosColumns />
			</div>

			<TodoDialog />
			<TodosColumnDialog />
		</>
	)
}
