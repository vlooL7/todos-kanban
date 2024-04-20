import { ReactNode } from 'react'
import { Navigation } from 'widgets/navigation'

export type HeaderProps = { children: ReactNode }
export const Header = ({ children }: HeaderProps) => {
	return (
		<div className="flex flex-row gap-4 p-2 justify-between">
			<Navigation />

			<div className="flex flex-row gap-2">{children}</div>
		</div>
	)
}
