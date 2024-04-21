import { useUnit } from 'effector-react'
import { Todo, todosModel } from 'entities/todos'
import { useDrag, useDrop } from 'react-dnd'
import { DnDTypes, TodoInTodosColumnDnDItem, useLatest } from 'shared/lib'

export const useTodoDnD = (todo: Todo) => {
	const todosApi = useUnit(todosModel.todosApi)

	const todoItemLatest = useLatest<TodoInTodosColumnDnDItem>({
		id: todo.id,
		columnId: todo.columnId
	})

	const [{ isMove }, drag, dragPreview] = useDrag(
		() => ({
			type: DnDTypes.TODO_IN_TODOS_COLUMN,
			item: todoItemLatest.current satisfies TodoInTodosColumnDnDItem,
			collect: monitor => ({
				isMove: monitor.getItem()?.id === todoItemLatest.current.id
			})
		}),
		[todoItemLatest]
	)

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: DnDTypes.TODO_IN_TODOS_COLUMN,
			canDrop(item: TodoInTodosColumnDnDItem) {
				const todoItem = todoItemLatest.current
				return item.id !== todoItem.id && !!(item.columnId && todoItem.columnId)
			},
			drop(item: TodoInTodosColumnDnDItem) {
				const todoItem = todoItemLatest.current
				if (!item.columnId || !todoItem.columnId) return

				todosApi.changeColumn({
					todoFromId: item.id,
					todoToId: todoItem.id,
					columnFromId: item.columnId,
					columnToId: todoItem.columnId
				})
			},
			collect: monitor => ({ isOver: !!monitor.isOver() })
		}),
		[todoItemLatest, todosApi]
	)

	return { isMove, isOver, drag, dragPreview, drop }
}
