<script lang="ts">
	import {
		audio,
		currentTime,
		duration,
		isLoading,
		showPlayer,
		trackId,
	} from '$lib/store.js';
	import { loadTrack, nextTrack } from '$lib/utils';
	import { Player } from '$modules';
	import { Separator } from 'bits-ui';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import Header from './Header.svelte';
	import Musics from './Musics.svelte';

	export let data: PageServerData;
	$: ({ musics, album, length } = data);
	$: src = musics[$trackId]?.url;

	let raf: number = 0;

	onMount(() => {
		loadTrack(musics, length);
	});
</script>

<div class="flex flex-col gap-4">
	<Header cover={album.cover} name={album.name} release={album.release} />
	<Separator.Root class="mx-auto h-px w-11/12 bg-gray-5" />
	<Musics />
</div>
<audio
	{src}
	bind:this={$audio}
	bind:duration={$duration}
	bind:currentTime={$currentTime}
	on:canplay={() => ($isLoading = false)}
	on:ended={() => nextTrack(musics, length)}
	hidden
/>
{#if $showPlayer}
	<Player {musics} {length} cover={album.cover} {raf} />
{/if}
