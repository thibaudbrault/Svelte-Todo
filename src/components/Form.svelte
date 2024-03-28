<script lang="ts">
	import { Button } from '$components';
	import { toast } from 'svelte-sonner';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	export let data;
	export let id: string;
	export let schema;
	export let withButton: boolean = true;

	export const _form = superForm(data, {
		dataType: 'form',
		invalidateAll: true,
		validators: zod(schema),
		validationMethod: 'onblur',
		id: id,
		onError({ result }) {
			toast.error(result.error.message);
		},
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
			}
		},
	});

	const { message, delayed, errors, allErrors, submitting, enhance } = _form;
</script>

<form method="POST" use:enhance {...$$restProps} enctype="multipart/form-data">
	<slot
		form={_form}
		message={$message}
		errors={$errors}
		allErrors={$allErrors}
		delayed={$delayed}
	/>
	{#if withButton}
		<Button
			intent="primary"
			size="small"
			width="full"
			class="font-semibold lowercase"
			style="font-variant: small-caps;"
			disabled={$submitting}
		>
			Add
		</Button>
	{/if}
</form>
