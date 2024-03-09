<script lang="ts">
	import { Label } from 'bits-ui';
	import type { InputConstraint } from 'sveltekit-superforms';

	export let value: File;
	export let name: string;
	export let accept: string;
	export let checked: boolean | undefined = false;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
</script>

<Label.Root class="text-sm font-semibold" for={name}>{label}</Label.Root>
<input
	type="file"
	{name}
	{accept}
	multiple={checked}
	bind:value
	on:input={(e) => {
		const file = e.currentTarget.files?.item(0);
		if (file instanceof File) {
			value = file;
		}
	}}
	aria-invalid={errors ? 'true' : undefined}
	{...constraints}
	{...$$restProps}
/>
{#if errors}<small class="text-xs text-red-700">{errors}</small>{/if}
