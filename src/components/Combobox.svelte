<script lang="ts">
	import { Combobox, Label } from 'bits-ui';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { formFieldProxy } from 'sveltekit-superforms/client';

	export let items: { value: string; name: string }[];
	export let field: string;
	export let label: string;
	export let placeholder: string;
	export let form;
	export let icon;

	$: filteredItems = $value
		? items.filter((item) => item.value.includes($value.toLowerCase()))
		: items;

	const { value } = formFieldProxy(form, field);
</script>

<div class="flex flex-col gap-1">
	<Label.Root class="text-sm font-semibold" for={field}>{label}</Label.Root>
	<Combobox.Root items={filteredItems} bind:inputValue={$value}>
		<div class="relative">
			<svelte:component
				this={icon}
				class="absolute start-3 top-1/2 size-6 -translate-y-1/2 text-gray-12"
			/>
			<Combobox.Input
				class="flex w-full rounded-md border border-gray-6 bg-grayA-3 px-12 py-2 text-sm outline-none placeholder:text-gray-11 focus:border-yellow-6"
				{placeholder}
				aria-label={placeholder}
			/>
			<ChevronsUpDown
				class="absolute end-3 top-1/2 size-6 -translate-y-1/2 text-gray-11"
			/>
		</div>

		<Combobox.Content
			class="w-full rounded-md border border-gray-7 bg-gray-1 px-1 py-3 outline-none"
			sideOffset={8}
		>
			{#each filteredItems as item (item.value)}
				<Combobox.Item
					class="rounded-button flex w-full select-none items-center rounded-md py-3 pl-5 pr-1.5 text-sm font-semibold capitalize outline-none transition-all duration-75 data-[highlighted]:bg-gray-2"
					value={item.value}
					label={item.name}
				>
					{item.name}
					<Combobox.ItemIndicator class="ml-auto" asChild={false}>
						<Check />
					</Combobox.ItemIndicator>
				</Combobox.Item>
			{:else}
				<span class="block px-5 py-2 text-sm text-muted-foreground">
					No results found
				</span>
			{/each}
		</Combobox.Content>
		<Combobox.HiddenInput name={field} />
	</Combobox.Root>
</div>
