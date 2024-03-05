<script lang="ts">
	import { Card } from '$components';

	export let data;
	let albums = data.result;
</script>

<section class="col-span-5 space-y-8 p-4">
	<h2 class="text-4xl font-bold">Library</h2>
	<div class=" grid grid-cols-6 gap-6">
		{#each albums as album}
			<Card
				title={album.name}
				alt={album.name}
				cover={album.cover}
				link={`/album/${album.slug}`}
			/>
		{/each}
	</div>
</section>
