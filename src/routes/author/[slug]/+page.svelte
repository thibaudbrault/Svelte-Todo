<script lang="ts">
	import { page } from '$app/stores';
	import type { SelectMusic } from '$lib/db';
	import { cover, favoritesMusics, length, musics, trackId } from '$lib/store';
	import { Musics } from '$modules';
	import { Separator } from 'bits-ui';
	import { onMount } from 'svelte';

	$: $cover = $page.data.musics[$trackId].album.cover;

	onMount(() => {
		$musics = $page.data.musics;
		$length = $page.data.musics.length;
		$page.data.favoritesMusics.forEach((music: SelectMusic) => {
			favoritesMusics.update((current) => current.add(music.id));
		});
	});
</script>

<div class="flex flex-col gap-4 p-4">
	<div class="flex flex-col gap-2">
		<h1 class="text-4xl font-bold md:text-5xl lg:text-6xl">
			{$page.data.author.name}
		</h1>
		<p class="text-gray-11">
			{$length} titles
		</p>
	</div>
	<Separator.Root class="mx-auto h-px w-11/12 bg-gray-5" />
	<Musics />
</div>
