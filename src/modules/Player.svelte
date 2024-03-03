<script lang="ts">
	import { Button } from '$components';
	import type { SelectMusic } from '$lib/db';
	import {
		albumLength,
		audio,
		currentTime,
		index,
		isPlaying,
		title,
	} from '$lib/store';
	import { format } from '$lib/utils';
	import { FastForward, Pause, Play, Rewind } from 'lucide-svelte';

	export let duration: number;
	export let musics: SelectMusic[];

	const loadTrack = (index: number) => {
		$isPlaying = false;
		$title = musics[index].title;
		$audio.src = musics[index].url;
		$audio.load();
	};

	const playPauseTrack = () => {
		if ($isPlaying) {
			$audio.pause();
		} else {
			$audio.play();
		}
		$isPlaying = !$isPlaying;
	};

	const prevTrack = () => {
		$isPlaying = false;
		$currentTime = 0;
		if ($index > 0) {
			$index -= 1;
		} else {
			$index = $albumLength - 1;
		}
		loadTrack($index);
	};

	const nextTrack = () => {
		$isPlaying = false;
		$currentTime = 0;
		if ($index < $albumLength - 1) {
			$index += 1;
		} else {
			$index = 0;
		}
		loadTrack($index);
	};
</script>

<section
	class="absolute bottom-2 left-12 right-12 col-span-5 grid grid-cols-[2fr_6fr_2fr] items-center justify-items-center rounded-md border border-gray-6 bg-gray-3 px-2 py-4"
>
	<p class="font-semibold">{$title}</p>
	<div class="flex items-center gap-2">
		<Button intent="secondary" size="icon" on:click={prevTrack}
			><Rewind /></Button
		>
		<Button size="icon" on:click={playPauseTrack}>
			{#if $isPlaying}
				<Pause class="h-8 w-8" />
			{:else}
				<Play class="h-8 w-8" />
			{/if}
		</Button>
		<Button intent="secondary" size="icon" on:click={nextTrack}
			><FastForward /></Button
		>
	</div>
	<p>{format($currentTime)} / {format(duration)}</p>
</section>
