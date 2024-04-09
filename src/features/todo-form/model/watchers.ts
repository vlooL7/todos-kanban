import { EventPayload, sample } from 'effector'
import { todosColumnsModel } from 'entities/todos-columns'
import { and, not, reset } from 'patronum'
import { dialogApi, formApi } from './api'
import { $edited, $formValidation, $todoId, $todosColumnId } from './computed'
import { $form, $visible } from './stores'

const { todoInTodosColumnApi } = todosColumnsModel

const create = sample({
	clock: formApi.submit,
	filter: not($edited)
})

const edit = sample({
	clock: formApi.submit,
	filter: $edited
})

sample({
	clock: create,
	source: { form: $form, formValidation: $formValidation },
	filter: and($formValidation, $todosColumnId),
	fn: ({ form }): EventPayload<typeof todoInTodosColumnApi.create> => ({
		...form,
		todosColumnId: form.todosColumnId!
	}),
	target: todoInTodosColumnApi.create
})

sample({
	clock: edit,
	source: { form: $form, formValidation: $formValidation },
	filter: and($formValidation, $todoId, $todosColumnId),
	fn: ({ form }): EventPayload<typeof todoInTodosColumnApi.update> => ({
		todo: { ...form.todo, id: form.todo.id! },
		todosColumnId: form.todosColumnId!
	}),
	target: todoInTodosColumnApi.update
})

sample({
	clock: dialogApi.openCreated,
	source: $form,
	fn: (form, formFromOpen) => ({
		...form,
		...formFromOpen,
		todo: { ...form.todo, ...formFromOpen.todo }
	}),
	target: $form
})

sample({
	clock: dialogApi.openEdited,
	target: $form
})

reset({ clock: dialogApi.close, target: [$form, $visible] })
