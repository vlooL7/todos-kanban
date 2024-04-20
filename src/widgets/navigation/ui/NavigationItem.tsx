import { Link, LinkOptions, RegisteredRouter } from '@tanstack/react-router'
import { ReactNode } from 'react'
import {
	NavigationMenuLink,
	navigationMenuTriggerStyle
} from 'shared/components'
import { twMerge } from 'tailwind-merge'

export type NavigationItemProps = {
	children: ReactNode
} & LinkOptions<RegisteredRouter['routeTree']>
export const NavigationItem = ({ children, to }: NavigationItemProps) => {
	return (
		<NavigationMenuLink
			className={twMerge(navigationMenuTriggerStyle(), 'w-full justify-start')}
			asChild>
			<Link to={to} className="[&.active]:font-bold">
				{children}
			</Link>
		</NavigationMenuLink>
	)
}
