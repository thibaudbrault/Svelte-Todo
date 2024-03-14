<script lang="ts">
	import { Label } from 'bits-ui';
	import type { InputConstraint } from 'sveltekit-superforms';

	export let value: string;
	export let name: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
</script>

<div class="flex flex-col gap-1">
	<Label.Root class="text-sm font-semibold" for={name}>{label}</Label.Root>
	<input
		type="text"
		{name}
		bind:value
		aria-invalid={errors ? 'true' : undefined}
		{...constraints}
		{...$$restProps}
		class="border-gray-6 bg-grayA-3 focus:border-yellow-6 rounded-md border p-1 outline-none"
	/>
	{#if errors}<small class="text-xs text-red-700">{errors}</small>{/if}
</div>
