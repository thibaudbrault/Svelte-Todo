<script lang="ts">
	import { SearchIcon } from 'lucide-svelte';
	import Button from './Button.svelte';

	export let placeholder: string;
</script>

<form class="[&_svg]:focus-within:text-yellow-12 mx-auto w-full">
	<label
		for="default-search"
		class="text-gray-12 sr-only mb-2 text-sm font-medium">Search</label
	>
	<div class="relative">
		<div
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
		>
			<SearchIcon />
		</div>
		<input
			type="search"
			id="default-search"
			class="border-gray-6 bg-gray-3 text-gray-12 focus:border-yellow-6 block w-full rounded-full border px-4 py-2 pl-12 text-sm outline-none"
			{placeholder}
			required
		/>
		<Button
			type="submit"
			rounded="full"
			size="small"
			weight="semibold"
			class="absolute bottom-0 right-0 top-0">Search</Button
		>
	</div>
</form>
