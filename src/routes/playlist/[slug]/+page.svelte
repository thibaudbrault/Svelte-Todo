<script lang="ts">
	import { page } from '$app/stores';
	import { cover, length, musics, trackId } from '$lib/store';
	import Musics from '$modules/Musics.svelte';
	import { onMount } from 'svelte';

	let isPlaylist = true;

	$: $cover = $page.data.playlist.musics[$trackId]?.album.cover;

	onMount(() => {
		$musics = $page.data.playlist.musics;
		$length = $page.data.playlist.musics.length;
	});
</script>

<section class="space-y-4">
	<h2 class="text-3xl font-semibold">{$page.data.name}</h2>
	<Musics {isPlaylist} />
</section>
