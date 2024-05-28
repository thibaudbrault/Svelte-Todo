<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$components';
</script>

<section>
	{#if $page.data.favoritesAlbums.length > 0}
		<div class="flex flex-wrap gap-6">
			{#each $page.data.favoritesAlbums as album}
				<Card
					title={album.name}
					alt={album.name}
					cover={album.cover}
					link={`/album/${album.slug}`}
					release={album.release}
					game={album.games.name}
				/>
			{/each}
		</div>
	{:else}
		<p
			class="col-span-5 py-4 text-center text-xl font-semibold capitalize md:text-2xl"
		>
			No album
		</p>
	{/if}
</section>
