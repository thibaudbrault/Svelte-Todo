<script lang="ts">
	import { page } from '$app/stores';
	import { SEO } from '$components';
	import { cover, length, musics, trackId } from '$lib/store';
	import Musics from '$modules/Musics.svelte';
	import { onMount } from 'svelte';

	let isPlaylist = true;

	$: $cover = $page.data.playlist.musics[$trackId]?.album.cover;

	const seoProps = {
		title: `Playlist | ${$page.data.playlist.name}`,
		slug: `playlist/${$page.params.slug}`,
		metadescription: `Listen to your playlist ${$page.data.playlist.name}`,
	};

	onMount(() => {
		$musics = $page.data.playlist.musics;
		$length = $page.data.playlist.musics.length;
	});
</script>

<SEO {...seoProps} />
<section class="space-y-4">
	<h2 class="text-3xl font-semibold">{$page.data.playlist.name}</h2>
	<Musics {isPlaylist} />
</section>
