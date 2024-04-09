import { and, reshape } from 'patronum'
import { $form } from './stores'

export const { $todo, $todoId, $todosColumnId } = reshape({
	source: $form,
	shape: {
		$todo: form => form.todo,
		$todoId: form => form.todo.id ?? null,
		$todosColumnId: form => form.todosColumnId ?? null
	}
})

export const $edited = and($todoId)

export const $formValidation = and(
	$todosColumnId,
	$form.map(({ todo }) => todo.title)
)
