<script>
	import { Sidebar } from '$modules';
	import '../app.css';
</script>

<main class="grid h-screen w-screen grid-cols-6 bg-gray-1 text-gray-12">
	<Sidebar />
	<slot />
</main>
