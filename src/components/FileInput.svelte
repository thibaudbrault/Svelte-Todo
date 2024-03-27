<script lang="ts">
	import { Label } from 'bits-ui';
	import { Upload } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { formFieldProxy } from 'sveltekit-superforms';

	export let field: string;
	export let label: string | undefined = undefined;
	export let form;
	export let isMultiple: boolean = false;

	const { value, errors, constraints } = formFieldProxy(form, field);

	const dispatch = createEventDispatcher();

	const input = (e: Event) => {
		if (isMultiple) {
			const files = Array.from(
				(e.currentTarget as HTMLInputElement).files ?? [],
			);
			$value = files;
			dispatch('input', files);
		} else {
			const file = (e.currentTarget as HTMLInputElement).files?.item(0) ?? null;
			$value = file;
			dispatch('input', file);
		}
	};
</script>

<div class="flex w-full flex-col gap-1">
	<Label.Root
		class="flex w-full flex-col gap-1 text-sm font-semibold"
		for={field}
	>
		<p>{label}</p>
		<div class="flex w-full items-center justify-center">
			<div
				class="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-12 bg-grayA-3 hover:bg-gray-4"
			>
				<div class="flex flex-col items-center justify-center pb-6 pt-5">
					<Upload />
					{#if !isMultiple && $value instanceof File}
						<p>{$value.name}</p>
					{:else if isMultiple && $value.length > 0}
						<p>{$value.length} files</p>
					{:else}
						<p class="text-sm text-gray-11">
							<span class="font-semibold">Click to upload</span> or drag and drop
						</p>
					{/if}
				</div>
				<input
					id={field}
					type="file"
					name={field}
					multiple={isMultiple}
					bind:value={$value}
					on:change={input}
					aria-invalid={$errors ? 'true' : undefined}
					{...$constraints}
					{...$$restProps}
					class="hidden"
				/>
			</div>
		</div>
	</Label.Root>
	{#if $errors}<small class="text-xs text-red-400">{$errors}</small>{/if}
</div>
