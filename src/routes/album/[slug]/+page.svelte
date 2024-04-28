<script lang="ts">
	import { page } from '$app/stores';
	import type { SelectMusic } from '$lib/db';
	import { cover, favoritesMusics, length, musics } from '$lib/store';
	import { Musics } from '$modules';
	import { Separator } from 'bits-ui';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';

	$: $musics = $page.data.musics;

	onMount(() => {
		$length = $page.data.length;
		$cover = $page.data.album.cover;
		$page.data.favoritesMusics.forEach((music: SelectMusic) => {
			favoritesMusics.update((current) => current.add(music.id));
		});
	});
</script>

<div class="flex flex-col gap-4">
	<Header />
	<Separator.Root class="mx-auto h-px w-11/12 bg-gray-5" />
	<Musics />
</div>
