import { createStore } from 'effector'
import { Form } from './types'

export const $visible = createStore(false)

export const $form = createStore<Form>({
	todo: {
		title: '',
		description: ''
	}
})
