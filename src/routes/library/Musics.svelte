<script lang="ts">
	import { page } from '$app/stores';
	import { musics, trackId, length } from '$lib/store';
	import { loadTrack } from '$lib/utils';
	import { onMount } from 'svelte';

	const handleClick = (index: number) => {
		$trackId = index;
		loadTrack();
	};

	onMount(() => {
		$musics = $page.data.favoritesMusics;
		$length = $page.data.favoritesMusics.length;
	});
</script>

<section>
	{#if $page.data.favoritesMusics.length > 0}
		<div>
			{#each $page.data.favoritesMusics as music, index}
				<button on:click={() => handleClick(index)}>
					{music.name}
				</button>
			{/each}
		</div>
	{:else}
		<p class="col-span-5 py-4 text-center text-xl font-bold capitalize">
			No music
		</p>
	{/if}
</section>
