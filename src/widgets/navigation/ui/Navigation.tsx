import { Columns4Icon, List } from 'lucide-react'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger
} from 'shared/components'
import { NavigationItem } from './NavigationItem'

export const Navigation = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Todos</NavigationMenuTrigger>
					<NavigationMenuContent>
						<NavigationItem to="/todos/list">
							<List size="1em" /> List
						</NavigationItem>
						<NavigationItem to="/todos/columns">
							<Columns4Icon size="1em" /> Blocks
						</NavigationItem>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
