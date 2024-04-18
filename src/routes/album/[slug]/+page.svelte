<script lang="ts">
	import {
		audio,
		currentTime,
		duration,
		isDrawerOpen,
		isLoading,
		trackId,
	} from '$lib/store.js';
	import { nextTrack } from '$lib/utils';
	import { Player } from '$modules';
	import { Separator } from 'bits-ui';
	import { Drawer } from 'vaul-svelte';
	import type { PageServerData } from './$types';
	import Header from './Header.svelte';
	import Musics from './Musics.svelte';

	export let data: PageServerData;
	$: ({ musics, album, length } = data);
	$: src = musics[$trackId]?.url;

	let raf: number = 0;
</script>

<Drawer.Root bind:open={$isDrawerOpen}>
	<div class="flex flex-col gap-4">
		<Header
			cover={album.cover}
			name={album.name}
			release={album.release}
			albumId={album.id}
		/>
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
	<Player {musics} {length} cover={album.cover} {raf} />
</Drawer.Root>
