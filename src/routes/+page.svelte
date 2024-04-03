<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$components';
</script>

<div class="mb-4 mt-4 space-y-4 md:mt-0">
	<h2 class="text-2xl font-semibold">Latest</h2>
	<div class="flex flex-wrap gap-6">
		{#each $page.data.latestAlbums as album}
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
		{#each $page.data.popularAlbums as album}
			<Card
				title={album.name}
				alt={album.name}
				cover={album.cover}
				link={`/album/${album.slug}`}
			/>
		{/each}
	</div>
</div>
