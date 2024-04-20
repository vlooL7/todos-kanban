import { TodoDialog } from 'features/todo-form'
import { TodosColumnDialog } from 'features/todos-column-form'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TodosColumns } from 'widgets/todos-columns'
import { Header } from './Header'

export const TodosColumnsPage = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex flex-col h-screen w-screen">
				<Header />
				<TodosColumns />
			</div>

			<TodoDialog />
			<TodosColumnDialog />
		</DndProvider>
	)
}
