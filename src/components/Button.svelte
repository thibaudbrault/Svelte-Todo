<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cva, type VariantProps } from 'class-variance-authority';
	import { Button } from 'bits-ui';
	import { cn } from '$lib/utils';

	const button = cva(
		'rounded-md duration-300 transition-all ease-in-out shadow-sm',
		{
			variants: {
				intent: {
					primary:
						'text-gray-1 bg-gray-12 hover:bg-gray-11 shadow-transparent disabled:bg-gray-11',
					secondary: 'text-gray-12 shadow-grayA-7 bg-transparent',
					ghost: 'text-gray-12 shadow-transparent bg-transparent',
				},
				weight: {
					normal: 'font-normal',
					semibold: 'font-semibold',
				},
				rounded: {
					md: 'rounded-md',
					full: 'rounded-full',
				},
				size: {
					small: 'py-1 px-2',
					medium: 'py-2 px-4',
					large: 'py-2 px-8',
					icon: 'p-2',
				},
				width: {
					fit: 'w-fit',
					full: 'w-full',
				},
				layout: {
					center: 'flex items-center justify-center',
				},
			},
		},
	);

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof button> {}

	export let intent: $$Props['intent'] = 'primary';
	export let weight: $$Props['weight'] = 'normal';
	export let rounded: $$Props['rounded'] = 'md';
	export let size: $$Props['size'] = 'medium';
	export let width: $$Props['width'] = 'fit';
	export let layout: $$Props['layout'] = 'center';

	export let disabled: $$Props['disabled'] = false;
</script>

<Button.Root
	{...$$props}
	on:click
	class={cn(
		button({
			intent,
			weight,
			rounded,
			size,
			width,
			layout,
			class: $$props.class,
		}),
	)}
	{disabled}
>
	<slot />
</Button.Root>
