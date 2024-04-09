import { TodosColumnsPage } from 'pages/todos-columns'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function App() {
	return (
		<DndProvider backend={HTML5Backend}>
			<TodosColumnsPage />
		</DndProvider>
	)
}
