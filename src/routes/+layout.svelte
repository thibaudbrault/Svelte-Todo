<script>
	import { Sidebar } from '$modules';
	import '../app.css';
</script>

<main class="grid h-screen w-screen grid-cols-6">
	<Sidebar />
	<slot />
</main>

<style lang="postcss">
	:global(body) {
		@apply bg-neutral-900 text-neutral-100;
	}
</style>
