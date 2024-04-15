<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$components';
	import Search from '$components/Search.svelte';
	import type { SelectAlbum } from '$lib/db';

	let filteredAlbums: SelectAlbum[] = [];
	let query: string = '';

	const search = () => {
		return (filteredAlbums = $page.data.albums.filter((album: SelectAlbum) => {
			let albumName = album.name.toLowerCase();
			return albumName.includes(query.toLowerCase());
		}));
	};
</script>

<section class="flex flex-col gap-8">
	<Search bind:query on:input={search} placeholder="Search by album" />
	{#if query && filteredAlbums.length === 0}
		<p class="mt-8 flex items-center justify-center text-4xl font-semibold">
			No Results
		</p>
	{:else if filteredAlbums.length > 0}
		<div class="flex flex-wrap gap-6">
			{#each filteredAlbums as album}
				<Card
					title={album.name}
					alt={album.name}
					cover={album.cover}
					link={`/album/${album.slug}`}
				/>
			{/each}
		</div>
	{:else}
		<div class="flex flex-wrap gap-6">
			{#each $page.data.albums as album}
				<Card
					title={album.name}
					alt={album.name}
					cover={album.cover}
					link={`/album/${album.slug}`}
				/>
			{/each}
		</div>
	{/if}
</section>
