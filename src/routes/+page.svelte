<script lang="ts">
	import { Card } from '$components';
	import type { PageData } from './$types';
	export let data: PageData;
	let albums = data.result;
</script>

<div class="space-y-4">
	<h2 class="text-2xl font-semibold">Latest</h2>
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
</div>
<div class="space-y-4">
	<h2 class="text-2xl font-semibold">Popular</h2>
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
</div>
