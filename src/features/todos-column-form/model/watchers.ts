import { sample } from 'effector'
import { todosColumnsModel } from 'entities/todos-columns'
import { and, not, reset } from 'patronum'
import { dialogApi, formApi } from './api'
import { $edited, $formId, $formValidation } from './computed'
import { $form, $visible } from './stores'

const { todosColumnsApi } = todosColumnsModel

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
	source: $form,
	filter: $formValidation,
	target: todosColumnsApi.create
})

sample({
	clock: edit,
	source: { form: $form, id: $formId },
	filter: and($formValidation, $formId),
	fn: ({ form, id }) => ({ ...form, id: id! }),
	target: todosColumnsApi.update
})

sample({
	clock: dialogApi.openEdited,
	target: $form
})

reset({ clock: dialogApi.close, target: [$form, $visible] })
