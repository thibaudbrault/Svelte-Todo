<script lang="ts">
	import '../app.css';
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
</script>

<main
	class="relative grid h-screen max-h-screen grid-cols-6 grid-rows-[80px_1fr_8px] gap-y-4 overflow-y-hidden bg-gray-1 p-4 text-gray-12"
>
	<Navbar />
	<Sidebar />
	<section
		class="col-span-5 col-start-2 row-span-1 h-full space-y-8 rounded-md bg-gray-2 p-4"
	>
		<slot />
	</section>
	<div class="bg-gray-1" />
</main>
