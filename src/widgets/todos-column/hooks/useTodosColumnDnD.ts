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
			drop(item: TodosColumnDnDItem) {
				const todosColumnItem = todosColumnItemLatest.current
				if (item.id === todosColumnItem.id) return

				todosColumnsApi.moveAfter({
					todosColumn: item,
					todosColumnAfter: todosColumnItem
				})
			},
			collect: monitor => ({ isOver: !!monitor.isOver() })
		}),
		[todosColumnItemLatest, todosColumnsApi]
	)

	const [{ isTodoOver }, dropTodo] = useDrop(
		() => ({
			accept: DnDTypes.TODO_IN_TODOS_COLUMN,
			canDrop(item: TodoInTodosColumnDnDItem) {
				const todosColumnItem = todosColumnItemLatest.current
				return !!item.columnId && todosColumnItem.id !== item.columnId
			},
			drop(item: TodoInTodosColumnDnDItem) {
				if (!item.columnId) return

				const todosColumnItem = todosColumnItemLatest.current

				todoInTodosColumnApi.changeColumn({
					todoFromId: item.id,
					columnFromId: item.columnId,
					columnToId: todosColumnItem.id
				})
			},
			collect: monitor => ({ isTodoOver: !!monitor.isOver() })
		}),
		[todoInTodosColumnApi, todosColumnItemLatest]
	)

	return {
		isDragging,
		isOver,
		isTodoOver,
		drag,
		dragPreview,
		drop,
		dropTodo
	}
}
