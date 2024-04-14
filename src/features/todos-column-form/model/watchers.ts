import { sample } from 'effector'
import { todosColumnsModel } from 'entities/todos-columns'
import { reset } from 'patronum'
import { dialogApi } from './api'
import { $form, $visible, create, save } from './stores'

const { todosColumnsApi } = todosColumnsModel

sample({
	clock: create,
	target: todosColumnsApi.create
})

sample({
	clock: save,
	target: todosColumnsApi.update
})

sample({
	clock: dialogApi.openEdited,
	target: $form
})

reset({ clock: dialogApi.close, target: [$form, $visible] })
