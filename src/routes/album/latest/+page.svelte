<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$components';
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-3xl font-bold capitalize md:text-4xl">Latest albums</h2>
	<div class="flex flex-wrap justify-evenly gap-1 md:justify-around">
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
