import { sample } from 'effector'
import { todosColumnsModel } from 'entities/todos-columns'
import defaultsDeep from 'lodash/defaultsDeep'
import { reset } from 'patronum'
import { dialogApi } from './api'
import { $form, $visible, create, save } from './stores'

const { todoInTodosColumnApi } = todosColumnsModel

sample({
	clock: create,
	target: todoInTodosColumnApi.create
})

sample({
	clock: save,
	target: todoInTodosColumnApi.update
})

sample({
	clock: dialogApi.openCreated,
	source: $form,
	fn: (form, formFromOpen) => defaultsDeep(form, formFromOpen),
	target: $form
})

sample({
	clock: dialogApi.openEdited,
	target: $form
})

reset({ clock: dialogApi.close, target: [$form, $visible] })
