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
	const { updateByKey } = model.useUpdateByKey()

	const items = useMemo(() => {
		return todosColumns.map(item => {
			return (
				<SelectItem key={item.id} value={item.id}>
					{item.title}
				</SelectItem>
			)
		})
	}, [todosColumns])

	return (
		<Select
			value={todosColumnId ?? undefined}
			onValueChange={updateByKey('todosColumnId')}>
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
