<script lang="ts">
	import { Label } from 'bits-ui';
	import type { InputConstraint } from 'sveltekit-superforms';

	export let value: number;
	export let name: string;
	export let min: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;
</script>

<Label.Root class="text-sm font-semibold" for={name}>{label}</Label.Root>
<input
	type="number"
	{min}
	{name}
	bind:value
	aria-invalid={errors ? 'true' : undefined}
	{...constraints}
	{...$$restProps}
	class="rounded-md border border-gray-6 bg-grayA-3 p-1 outline-none focus:border-yellow-6"
/>
{#if errors}<small class="text-xs text-red-700">{errors}</small>{/if}
