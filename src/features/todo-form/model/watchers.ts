import { sample } from 'effector'
import { todosModel } from 'entities/todos'
import defaultsDeep from 'lodash/defaultsDeep'
import { reset } from 'patronum'
import { dialogApi } from './api'
import { $form, $visible, create, save } from './stores'

const { todosApi } = todosModel

sample({
	clock: create,
	target: todosApi.create
})

sample({
	clock: save,
	target: todosApi.update
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
