<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cva, type VariantProps } from 'class-variance-authority';
	import { Button } from 'bits-ui';
	import { cn } from '$lib/utils';

	const button = cva('rounded-md duration-300 transition-all ease-in-out', {
		variants: {
			intent: {
				primary:
					'text-neutral-900 bg-neutral-100 hover:bg-neutral-200 active:scale-[0.98]',
				secondary: 'secondary',
			},
			weight: {
				normal: 'font-normal',
				semibold: 'font-semibold',
			},
			size: {
				small: 'py-1 px-2',
				medium: 'py-2 px-4',
			},
		},
	});

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof button> {}

	export let intent: $$Props['intent'] = 'primary';
	export let weight: $$Props['weight'] = 'normal';
	export let size: $$Props['size'] = 'medium';
</script>

<Button.Root
	{...$$props}
	class={cn(button({ intent, weight, size, class: $$props.class }))}
>
	<slot />
</Button.Root>

<style lang="postcss">
	.button {
		display: inline-flex;
		border-width: 1px;
		border-style: solid;
	}

	.secondary {
		background-color: rgb(255 255 255);
		color: rgb(31 41 55);
		border-color: rgb(156 163 175);
	}

	.secondary:hover {
		background-color: rgb(243 244 246);
	}
</style>
