<script>
	import { Sidebar } from '$modules';
	import '../app.css';
</script>

<main class="flex h-screen w-screen">
	<Sidebar />
	<slot />
</main>

<style lang="postcss">
	:global(body) {
		@apply bg-neutral-900 text-neutral-100;
	}
</style>
