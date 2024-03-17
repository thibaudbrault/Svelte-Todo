<script lang="ts">
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	export let data;
	export let dataType: 'form' | 'json' | undefined = 'form';
	export let schema;
	export let invalidateAll: boolean = true;

	export const _form = superForm(data, {
		dataType: dataType,
		invalidateAll: invalidateAll,
		validators: zod(schema),
		validationMethod: 'onblur',
		onError({ result }) {
			$message = {
				text: result?.error?.message,
				status: 500,
			};
		},
		onUpdated({ form }) {
			if (form.valid) {
				console.log('Success');
			}
		},
	});

	const { message, delayed, errors, allErrors, enhance } = _form;
</script>

<form method="POST" use:enhance {...$$restProps} enctype="multipart/form-data">
	<slot
		form={_form}
		message={$message}
		errors={$errors}
		allErrors={$allErrors}
		delayed={$delayed}
	/>
</form>
