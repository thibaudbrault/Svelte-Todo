<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';

	export let data: LayoutData;
</script>

<main
	class="relative grid h-screen max-h-screen grid-cols-6 grid-rows-[80px_1fr_8px] overflow-y-hidden bg-gray-1 pb-2 text-gray-12"
>
	<Navbar />
	<Sidebar {data} />
	<section
		class="col-span-5 row-span-1 mx-2 h-full space-y-8 rounded-md bg-gray-2 p-4"
	>
		<slot />
	</section>
	<div class="bg-gray-1" />
</main>
