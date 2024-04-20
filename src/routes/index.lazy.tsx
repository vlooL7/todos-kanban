import { createLazyFileRoute } from '@tanstack/react-router'
import { TodosListPage } from 'pages/todos-list'

export const Route = createLazyFileRoute('/')({
	component: TodosListPage
})
