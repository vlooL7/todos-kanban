import { Outlet, createFileRoute } from '@tanstack/react-router'
import { TodoDialog } from 'features/todo-form'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { HeaderList } from './list/-HeaderList'

export const Route = createFileRoute('/todos/list')({
	component: LayoutComponent
})

function LayoutComponent() {
	return (
		<DndProvider backend={HTML5Backend}>
			<HeaderList />
			<Outlet />

			<TodoDialog />
		</DndProvider>
	)
}
