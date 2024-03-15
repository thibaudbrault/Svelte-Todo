<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';

	export let data: LayoutData;
</script>

<main
	class="relative grid h-screen w-screen grid-cols-6 grid-rows-[80px_1fr] bg-gray-1 text-gray-12"
>
	<Navbar />
	<Sidebar {data} />
	<section class="col-span-5 m-2 space-y-8 rounded-md bg-gray-2 p-4">
		<slot />
	</section>
</main>
