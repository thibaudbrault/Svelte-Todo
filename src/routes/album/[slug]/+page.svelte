<script lang="ts">
	import { page } from '$app/stores';
	import { cover, length, musics } from '$lib/store.js';
	import { Separator } from 'bits-ui';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import Musics from './Musics.svelte';

	onMount(() => {
		$musics = $page.data.musics;
		$length = $page.data.length;
		$cover = $page.data.album.cover;
	});
</script>

<div class="flex flex-col gap-4">
	<Header />
	<Separator.Root class="mx-auto h-px w-11/12 bg-gray-5" />
	<Musics />
</div>
