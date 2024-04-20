import { createLazyFileRoute } from '@tanstack/react-router'
import { TodosColumnsPage } from 'pages/todos-columns'

export const Route = createLazyFileRoute('/todos/columns')({
	component: TodosColumnsPage
})
