import { createLazyFileRoute } from '@tanstack/react-router'
import { TodosColumns } from 'widgets/todos-columns'

export const Route = createLazyFileRoute('/todos/columns/')({
	component: TodosColumnsPage
})

function TodosColumnsPage() {
	return <TodosColumns />
}
