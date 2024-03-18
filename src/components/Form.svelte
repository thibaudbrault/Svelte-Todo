<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$components';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	export let data;
	export let schema;

	export const theForm = superForm(data, {
		dataType: 'form',
		invalidateAll: true,
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

	const { message, delayed, errors, allErrors } = theForm;

	// allErrors.subscribe(async (val) => {
	// 	if (val.length > 0) {
	// 		isValid = false;
	// 	} else {
	// 		const res = await validateForm();
	// 		isValid = res.valid;
	// 	}
	// });
</script>

<form method="POST" use:enhance {...$$restProps} enctype="multipart/form-data">
	<slot
		form={theForm}
		message={$message}
		errors={$errors}
		allErrors={$allErrors}
		delayed={$delayed}
	/>
	<Button
		intent="primary"
		size="small"
		width="full"
		class="font-semibold lowercase"
		style="font-variant: small-caps;"
	>
		Add
	</Button>
</form>
