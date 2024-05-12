<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$components';
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-4xl font-bold capitalize">Latest albums</h2>
	<div class="flex flex-wrap gap-6">
		{#each $page.data.latestAlbums as album}
			<Card
				title={album.name}
				alt={album.name}
				cover={album.cover}
				release={album.release}
				game={album.games.name}
				link={`/album/${album.slug}`}
			/>
		{/each}
	</div>
</div>
