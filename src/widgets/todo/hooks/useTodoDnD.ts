import { useUnit } from 'effector-react'
import { Todo } from 'entities/todos'
import { todosColumnsModel } from 'entities/todos-columns'
import { useDrag, useDrop } from 'react-dnd'
import { DnDTypes, TodoInTodosColumnDnDItem, useLatest } from 'shared/lib'

export const useTodoDnD = (todo: Todo) => {
	const todoInTodosColumnApi = useUnit(todosColumnsModel.todoInTodosColumnApi)

	const todoItemLatest = useLatest<TodoInTodosColumnDnDItem>({
		id: todo.id,
		columnId: todo.columnId
	})

	const [{ isDragging, isMove }, drag, dragPreview] = useDrag(
		() => ({
			type: DnDTypes.TODO_IN_TODOS_COLUMN,
			item: todoItemLatest.current satisfies TodoInTodosColumnDnDItem,
			collect: monitor => ({
				isDragging: monitor.isDragging(),
				isMove: monitor.getItem()?.id === todoItemLatest.current.id
			})
		}),
		[todoItemLatest]
	)

	const [_collectedProps, drop] = useDrop(
		() => ({
			accept: DnDTypes.TODO_IN_TODOS_COLUMN,
			hover: (item: TodoInTodosColumnDnDItem) => {
				const todoItem = todoItemLatest.current
				if (item.id === todoItem.id) return
				if (!item.columnId || !todoItem.columnId) return

				todoInTodosColumnApi.moveFromTo({
					todoFromId: item.id,
					todoToId: todoItem.id,
					columnFromId: item.columnId,
					columnToId: todoItem.columnId
				})

				item.columnId = todoItem.columnId
			}
		}),
		[todoInTodosColumnApi, todoItemLatest]
	)

	return { isDragging, isMove, drag, dragPreview, drop }
}
