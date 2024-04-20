import { createLazyFileRoute } from '@tanstack/react-router'
import { TodosList } from 'widgets/todos-list'

export const Route = createLazyFileRoute('/todos/list/')({
	component: TodosListPage
})

function TodosListPage() {
	return <TodosList />
}
