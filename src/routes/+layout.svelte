<script>
	import { Navbar, Sidebar } from '$modules';
	import '../app.css';

	export let data;
</script>

<main
	class="bg-gray-1 text-gray-12 relative grid h-screen w-screen grid-cols-6 grid-rows-[80px_1fr]"
>
	<Navbar />
	<Sidebar data={data.form} />
	<section class="bg-gray-2 col-span-5 m-2 space-y-8 rounded-md p-4">
		<slot />
	</section>
</main>
