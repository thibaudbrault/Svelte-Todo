<script lang="ts">
	import { SearchIcon } from 'lucide-svelte';

	export let placeholder: string;
	export let query: string;
</script>

<div class="mx-auto w-full [&_svg]:focus-within:text-yellow-12">
	<label for="search" class="sr-only mb-2 text-sm font-medium text-gray-12"
		>Search</label
	>
	<div class="relative">
		<div
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
		>
			<SearchIcon />
		</div>
		<input
			id="search"
			name="search"
			class="block w-full rounded-md border border-gray-6 bg-gray-3 px-4 py-2 ps-10 text-sm text-gray-12 outline-none focus:border-yellow-6"
			{placeholder}
			type="search"
			required
			bind:value={query}
			on:input
		/>
	</div>
</div>
