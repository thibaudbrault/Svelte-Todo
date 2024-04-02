<script lang="ts">
	import { Label } from 'bits-ui';
	import { formFieldProxy } from 'sveltekit-superforms/client';

	export let field: string;
	export let label: string;
	export let form;

	const { value, errors, constraints } = formFieldProxy(form, field);
</script>

<div class="flex flex-col gap-1">
	<Label.Root class="text-sm font-semibold" for={field}>{label}</Label.Root>
	<input
		type="text"
		name={field}
		bind:value={$value}
		aria-invalid={$errors ? 'true' : undefined}
		{...$constraints}
		{...$$restProps}
		class="rounded-md border border-gray-6 bg-grayA-3 p-1 outline-none focus:border-yellow-6"
	/>
	{#if $errors}<small class="text-xs text-red-400">{$errors}</small>{/if}
</div>
