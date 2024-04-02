<script lang="ts">
	import { Dialog, Separator } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	export let title: string;
	export let trigger: string = '';
</script>

<Dialog.Root>
	<slot name="trigger">
		<Dialog.Trigger
			class="w-full rounded-md bg-gray-12 px-4 py-2 text-xl font-semibold lowercase text-gray-1 transition-all duration-300 ease-in-out hover:bg-gray-11"
			style="font-variant: small-caps;"
		>
			{trigger}
		</Dialog.Trigger>
	</slot>
	<Dialog.Portal>
		<Dialog.Overlay
			transition={fade}
			transitionConfig={{ duration: 150 }}
			class="fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] space-y-4 rounded-md border border-gray-6 bg-gray-2 p-4 outline-none"
		>
			<Dialog.Title
				class="flex w-full items-center justify-center text-2xl font-semibold capitalize"
				>{title}</Dialog.Title
			>
			<Separator.Root class="mx-auto block h-px w-11/12 bg-gray-6" />
			<div class="flex flex-col items-start gap-1">
				<slot name="content" />
			</div>
			<Dialog.Close class="absolute right-2 top-1 hover:text-yellow-12">
				<div>
					<X />
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
