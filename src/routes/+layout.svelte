<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import Sidebar from './Sidebar.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<Toaster
	richColors
	position="top-center"
	toastOptions={{ style: 'font-weight: 600; font-size: 1.25rem;' }}
/>
<main
	class="relative flex h-screen flex-col-reverse gap-y-4 bg-gray-1 p-4 text-gray-12 md:flex-row"
>
	<Sidebar />
	<section
		class="h-full w-full flex-1 overflow-y-auto rounded-md border border-gray-5 bg-gray-2 p-4"
	>
		<slot />
	</section>
</main>
