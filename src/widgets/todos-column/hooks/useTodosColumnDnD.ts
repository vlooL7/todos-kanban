import { useUnit } from 'effector-react'
import { TodosColumn, todosColumnsModel } from 'entities/todos-columns'
import { useDrag, useDrop } from 'react-dnd'
import {
	DnDTypes,
	TodoInTodosColumnDnDItem,
	TodosColumnDnDItem,
	useLatest
} from 'shared/lib'

export const useTodosColumnDnD = (todosColumn: TodosColumn) => {
	const todosColumnsApi = useUnit(todosColumnsModel.todosColumnsApi)
	const todoInTodosColumnApi = useUnit(todosColumnsModel.todoInTodosColumnApi)

	const latest = useLatest({
		todosLength: todosColumn.todos.length
	})
	const todosColumnItemLatest = useLatest<TodosColumnDnDItem>({
		id: todosColumn.id
	})

	const [{ isDragging }, drag, dragPreview] = useDrag(
		() => ({
			type: DnDTypes.TODOS_COLUMN,
			item: todosColumnItemLatest.current satisfies TodosColumnDnDItem,
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[todosColumnItemLatest]
	)

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: DnDTypes.TODOS_COLUMN,
			hover: (item: TodosColumnDnDItem) => {
				const todosColumnItem = todosColumnItemLatest.current

				todosColumnsApi.moveAfter({
					todosColumn: item,
					todosColumnAfter: todosColumnItem
				})
			},
			collect: monitor => ({
				isOver: !!monitor.isOver()
			})
		}),
		[todosColumnItemLatest, todosColumnsApi]
	)

	const [{ isTodoOver }, dropTodo] = useDrop(
		() => ({
			accept: DnDTypes.TODO_IN_TODOS_COLUMN,
			hover: (item: TodoInTodosColumnDnDItem) => {
				if (!item.columnId) return
				if (latest.current.todosLength !== 0) return

				const todosColumnItem = todosColumnItemLatest.current
				if (todosColumnItem.id === item.columnId) return

				todoInTodosColumnApi.pushFromTo({
					todoFromId: item.id,
					columnFromId: item.columnId,
					columnToId: todosColumnItem.id
				})

				item.columnId = todosColumnItem.id
			},
			collect: monitor => ({
				isTodoOver: !!monitor.isOver()
			})
		}),
		[latest, todoInTodosColumnApi, todosColumnItemLatest]
	)

	return { isDragging, isOver, isTodoOver, drag, dragPreview, drop, dropTodo }
}
