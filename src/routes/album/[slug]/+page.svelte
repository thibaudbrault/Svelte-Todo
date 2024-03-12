<script lang="ts">
	import { goto } from '$app/navigation';
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
	import { LibraryHeader, LibraryMusics, Player } from '$modules';
	import { onMount } from 'svelte';

	export let data;
	let musics = data.musics;
	let albumTitle = data.name;
	let cover = data.cover;

	let albumLength: number = musics.length;
	let selectedTrack: number | null = null;
	let raf: number = 0;

	let src = musics[$trackId]?.url;

	const loadTrack = () => {
		$sliderValue = 0;
		selectedTrack = $trackId;
		if (musics.length > 0) {
			$title = musics[$trackId]?.title;
			$audio.src = musics[$trackId]?.url;
			$showPlayer = true;
			$audio.load();
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
			$trackId = Math.floor(Math.random() * albumLength);
		} else if ($isLooped) {
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
		if ($isShuffled) {
			$trackId = Math.floor(Math.random() * albumLength);
		} else if ($isLooped) {
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

<div class="h-full">
	<LibraryHeader {cover} {albumTitle} albumLength={musics.length} />
	<LibraryMusics
		{musics}
		{selectedTrack}
		{loadTrack}
		formSingleProps={data.formSingle}
		formMultipleProps={data.formMultiple}
	/>
	<audio
		{src}
		bind:this={$audio}
		bind:duration={$duration}
		bind:currentTime={$currentTime}
		on:ended={nextTrack}
		hidden
	/>
	{#if $showPlayer}
		<Player {cover} {playPauseTrack} {prevTrack} {nextTrack} />
	{/if}
</div>
