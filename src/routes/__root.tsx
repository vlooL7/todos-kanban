import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
	component: () => (
		<div className="flex flex-col h-screen w-screen overflow-hidden">
			<Outlet />
			<TanStackRouterDevtools />
		</div>
	)
})
