<script lang="ts">
	import { Card } from '$components';

	export let data;
	let albums = data.result;
</script>

<h2 class="text-4xl font-bold">Library</h2>
<div class="flex flex-wrap gap-6">
	{#each albums as album}
		<Card
			title={album.name}
			alt={album.name}
			cover={album.cover}
			link={`/album/${album.slug}`}
		/>
	{/each}
</div>
