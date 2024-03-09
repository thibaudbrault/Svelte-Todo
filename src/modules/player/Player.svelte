<script lang="ts">
	import { Button } from '$components';
	import {
		isPlaying,
		title,
		isLooped,
		isShuffled,
		showPlayer,
	} from '$lib/store';
	import {
		FastForward,
		Heart,
		Pause,
		Play,
		Repeat,
		Rewind,
		Shuffle,
	} from 'lucide-svelte';
	import Slider from './Slider.svelte';

	export let playPauseTrack: () => void;
	export let prevTrack: () => void;
	export let nextTrack: () => void;
	export let updatePosition: () => void;

	const handleLoop = () => {
		$isLooped = !$isLooped;
		$isShuffled = false;
	};
	const handleShuffle = () => {
		$isShuffled = !$isShuffled;
		$isLooped = false;
	};
</script>

<section
	class="absolute bottom-4 left-4 right-4 col-span-5 grid grid-cols-[2fr_6fr_1fr] items-center justify-items-center rounded-md bg-yellow-surface px-2 py-4 shadow-sm shadow-yellowA-7 hover:shadow-yellowA-8"
>
	<p class="text-xl font-semibold text-yellowA-11">{$title}</p>
	<div class="mx-auto flex w-3/4 flex-col items-center justify-center gap-4">
		<div class="flex items-center gap-2">
			<Button intent="ghost" size="icon" on:click={handleLoop}>
				<Repeat class={`${$isLooped ? 'text-yellow-11' : ''}`} />
			</Button>
			<Button intent="secondary" size="icon" on:click={prevTrack}>
				<Rewind />
			</Button>
			<Button size="icon" on:click={playPauseTrack}>
				{#if $isPlaying}
					<Pause class="h-8 w-8" />
				{:else}
					<Play class="h-8 w-8" />
				{/if}
			</Button>
			<Button intent="secondary" size="icon" on:click={nextTrack}>
				<FastForward />
			</Button>
			<Button intent="ghost" size="icon" on:click={handleShuffle}>
				<Shuffle class={`${$isShuffled ? 'text-yellow-11' : ''}`} />
			</Button>
		</div>
		<Slider on:change={updatePosition} />
	</div>
	<Heart />
	<button class="absolute right-2 top-1" on:click={() => ($showPlayer = false)}
		>X</button
	>
</section>
