import { and, reshape } from 'patronum'
import { $form } from './stores'

export const { $formId } = reshape({
	source: $form,
	shape: {
		$formId: form => form.id ?? null
	}
})

export const $edited = and($formId)

export const $formValidation = $form.map(({ title }): boolean => !!title)
