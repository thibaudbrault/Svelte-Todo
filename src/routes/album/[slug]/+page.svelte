<script lang="ts">
	import {
		audio,
		currentTime,
		duration,
		isLooped,
		isPlaying,
		isShuffled,
		showPlayer,
		sliderValue,
		title,
		trackId,
	} from '$lib/store.js';
	import { Player } from '$modules';
	import { onMount } from 'svelte';
	import Musics from './Musics.svelte';
	import Header from './Header.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	$: ({ musics, album, length } = data);
	$: src = musics[$trackId]?.url;

	let selectedTrack: number | null = null;
	let raf: number = 0;

	const loadTrack = () => {
		$sliderValue = 0;
		selectedTrack = $trackId;
		if (length > 0) {
			$title = musics[$trackId]?.name;
			$audio.src = musics[$trackId]?.url;
			$showPlayer = true;
			$audio.load();
			if ($isPlaying) {
				$audio.play();
			}
		}
	};

	const handlePlaying = () => {
		$sliderValue = $audio.currentTime;
		$currentTime = $sliderValue;
		raf = requestAnimationFrame(handlePlaying);
	};

	const playPauseTrack = () => {
		if ($isPlaying) {
			$audio.pause();
			$isPlaying = false;
			cancelAnimationFrame(raf);
		} else {
			$audio.play();
			$isPlaying = true;
			requestAnimationFrame(handlePlaying);
		}
	};

	const prevTrack = () => {
		$currentTime = 0;
		if ($isShuffled) {
			$trackId = Math.floor(Math.random() * length);
		} else if ($isLooped) {
			$trackId = $trackId;
		} else {
			if ($trackId > 0) {
				$trackId -= 1;
			} else {
				$trackId = length - 1;
			}
		}
		loadTrack();
		switchTrack();
	};

	const nextTrack = () => {
		$currentTime = 0;
		if ($isShuffled) {
			$trackId = Math.floor(Math.random() * length);
		} else if ($isLooped) {
			$trackId = $trackId;
		} else {
			if ($trackId < length - 1) {
				$trackId += 1;
			} else {
				$trackId = 0;
			}
		}
		loadTrack();
		switchTrack();
	};

	const switchTrack = () => {
		if ($isPlaying) {
			$audio.play();
		}
	};

	onMount(() => {
		loadTrack();
	});
</script>

<Header cover={album.cover} name={album.name} />
<Musics {selectedTrack} {loadTrack} />
<audio
	{src}
	bind:this={$audio}
	bind:duration={$duration}
	bind:currentTime={$currentTime}
	on:ended={nextTrack}
	hidden
/>
{#if $showPlayer}
	<Player cover={album.cover} {playPauseTrack} {prevTrack} {nextTrack} />
{/if}
