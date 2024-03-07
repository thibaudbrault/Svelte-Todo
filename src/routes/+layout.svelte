<script>
	import { Sidebar } from '$modules';
	import '../app.css';
</script>

<main class="grid h-screen w-screen grid-cols-6 bg-gray-1 text-gray-12">
	<Sidebar />
	<section class="col-span-5 m-2 space-y-8 rounded-md bg-gray-2 p-4">
		<slot />
	</section>
</main>
