<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		audio,
		currentTime,
		duration,
		isLooped,
		isPlaying,
		sliderValue,
		title,
		trackId,
	} from '$lib/store.js';
	import { LibraryHeader, LibraryMusics, Player } from '$modules';
	import { onMount } from 'svelte';

	export let data;
	let musics = data.musics;
	let albumLength = musics.length;
	let albumTitle = data.name;
	let cover = data.cover;

	let showPlayer: boolean = false;
	let selectedTrack: number | null = null;
	let raf: number = 0;

	let src = musics[$trackId].url;

	const loadTrack = () => {
		$sliderValue = 0;
		selectedTrack = $trackId;
		$title = musics[$trackId].title;
		$audio.src = musics[$trackId].url;
		showPlayer = true;
		$audio.load();
	};

	const handlePlaying = () => {
		$sliderValue = $audio.currentTime;
		$currentTime = $sliderValue;
		raf = requestAnimationFrame(handlePlaying);
	};

	const updatePosition = () => {
		$audio.currentTime = $sliderValue;
		if (!$audio.paused) {
			requestAnimationFrame(handlePlaying);
		}
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
		if ($isLooped) {
			$trackId = $trackId;
		} else {
			if ($trackId > 0) {
				$trackId -= 1;
			} else {
				$trackId = albumLength - 1;
			}
		}
		loadTrack();
		switchTrack();
	};

	const nextTrack = () => {
		$currentTime = 0;
		if ($isLooped) {
			$trackId = $trackId;
		} else {
			if ($trackId < albumLength - 1) {
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

	if (!musics) {
		goto('/');
	}
</script>

<section class="relative col-span-5 p-2">
	<div class="h-full rounded-md bg-grayA-4">
		<LibraryHeader {cover} {albumTitle} albumLength={musics.length} />
		<LibraryMusics {musics} {selectedTrack} {loadTrack} />
	</div>
	<audio
		{src}
		bind:this={$audio}
		bind:duration={$duration}
		bind:currentTime={$currentTime}
		on:ended={nextTrack}
		hidden
	/>
	{#if showPlayer}
		<Player {playPauseTrack} {prevTrack} {nextTrack} {updatePosition} />
	{/if}
</section>
