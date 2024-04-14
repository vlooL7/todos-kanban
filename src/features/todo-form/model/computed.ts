import { reshape } from 'patronum'
import { $form } from './stores'

export const { $todo, $todosColumnId } = reshape({
	source: $form,
	shape: {
		$todo: form => form.todo,
		$todosColumnId: form => form.todosColumnId ?? null
	}
})
