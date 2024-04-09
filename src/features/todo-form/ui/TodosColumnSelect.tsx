import { useUnit } from 'effector-react'
import { todosColumnsModel } from 'entities/todos-columns'
import { useMemo } from 'react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from 'shared/components'
import { model } from '../model'

type TodosColumnSelectProps = { id: string; placeholder: string }
export const TodosColumnSelect = ({
	id,
	placeholder
}: TodosColumnSelectProps) => {
	const [todosColumnId, todosColumns] = useUnit([
		model.$todosColumnId,
		todosColumnsModel.$todosColumns
	])
	const formApi = useUnit(model.formApi)

	const items = useMemo(() => {
		return todosColumns.map(({ id, title }) => {
			return (
				<SelectItem key={id} value={id}>
					{title}
				</SelectItem>
			)
		})
	}, [todosColumns])

	return (
		<Select
			value={todosColumnId ?? undefined}
			onValueChange={formApi.setTodoColumn}>
			<SelectTrigger id={id}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Columns</SelectLabel>
					{items}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
