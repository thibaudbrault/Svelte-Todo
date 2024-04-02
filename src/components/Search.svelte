<script lang="ts">
	import { SearchIcon } from 'lucide-svelte';
	import Button from './Button.svelte';

	export let placeholder: string;
</script>

<form class="mx-auto w-full [&_svg]:focus-within:text-yellow-12">
	<label
		for="default-search"
		class="sr-only mb-2 text-sm font-medium text-gray-12">Search</label
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
			class="block w-full rounded-full border border-gray-6 bg-gray-3 px-4 py-2 ps-10 text-sm text-gray-12 outline-none focus:border-yellow-6"
			{placeholder}
			required
		/>
		<Button
			type="submit"
			rounded="full"
			size="small"
			weight="semibold"
			class="absolute end-4 top-1/2 -translate-y-1/2 transform text-sm "
			>Search</Button
		>
	</div>
</form>
