import { Outlet, createFileRoute } from '@tanstack/react-router'
import { TodoDialog } from 'features/todo-form'
import { TodosColumnDialog } from 'features/todos-column-form'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { HeaderColumns } from './columns/-HeaderColumns'

export const Route = createFileRoute('/todos/columns')({
	component: LayoutComponent
})

function LayoutComponent() {
	return (
		<DndProvider backend={HTML5Backend}>
			<HeaderColumns />
			<Outlet />

			<TodoDialog />
			<TodosColumnDialog />
		</DndProvider>
	)
}
