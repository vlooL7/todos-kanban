import { TodoDialog } from 'features/todo-form'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Header } from './Header'
import { TodosList } from 'widgets/todos-list'

export const TodosListPage = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex flex-col h-screen w-screen">
				<Header />
				<TodosList />
			</div>

			<TodoDialog />
		</DndProvider>
	)
}
