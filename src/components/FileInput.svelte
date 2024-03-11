<script lang="ts">
	import { Label } from 'bits-ui';
	import type { InputConstraint } from 'sveltekit-superforms';

	export let value: File | File[];
	export let name: string;
	export let accept: string;
	export let multiple: boolean | undefined = false;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
</script>

<div class="flex flex-col gap-1">
	<Label.Root class="text-sm font-semibold" for={name}>{label}</Label.Root>
	<input
		type="file"
		{name}
		{accept}
		{multiple}
		bind:value
		aria-invalid={errors ? 'true' : undefined}
		{...constraints}
		{...$$restProps}
	/>
	{#if errors}<small class="text-xs text-red-700">{errors}</small>{/if}
</div>
<!-- on:input={(e) => (value = e.currentTarget.files?.item(0) as File)} -->
