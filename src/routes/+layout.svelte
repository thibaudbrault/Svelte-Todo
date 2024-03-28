<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
</script>

<Toaster
	richColors
	position="top-center"
	toastOptions={{ style: 'font-weight: 600; font-size: 1.25rem;' }}
/>
<main
	class="relative grid h-screen max-h-screen grid-cols-6 grid-rows-[80px_1fr_8px] gap-y-4 overflow-y-hidden bg-gray-1 p-4 text-gray-12"
>
	<Sidebar />
	<Navbar />
	<section
		class="col-span-5 col-start-2 row-span-1 h-full space-y-8 rounded-md border border-gray-5 bg-gray-2 p-4"
	>
		<slot />
	</section>
	<div class="bg-gray-1" />
</main>
