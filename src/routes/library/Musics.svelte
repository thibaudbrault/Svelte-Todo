<script lang="ts">
	import { page } from '$app/stores';
	import {
		currentTime,
		duration,
		isLoading,
		showPlayer,
		audio,
		trackId,
	} from '$lib/store';
	import { loadTrack, nextTrack } from '$lib/utils';
	import { Player } from '$modules';

	$: src = $page.data.favoritesMusics[$trackId]?.url;

	let raf: number = 0;

	const handleClick = (index: number) => {
		$trackId = index;
		loadTrack(
			$page.data.favoritesMusics,
			$trackId,
			$page.data.favoritesMusics.length,
		);
	};
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
<audio
	{src}
	bind:this={$audio}
	bind:duration={$duration}
	bind:currentTime={$currentTime}
	on:canplay={() => ($isLoading = false)}
	on:ended={() => nextTrack($page.data.favoritesMusics, length)}
	hidden
/>
{#if $showPlayer}
	<Player
		musics={$page.data.favoritesMusics}
		length={$page.data.favoritesMusics.length}
		cover={''}
		{raf}
	/>
{/if}
