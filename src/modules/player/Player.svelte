<script lang="ts">
	import { Button } from '$components';
	import { isLooped, isPlaying, isShuffled, title } from '$lib/store';
	import {
		Heart,
		ListPlus,
		Pause,
		Play,
		Repeat,
		Shuffle,
		SkipBack,
		SkipForward,
	} from 'lucide-svelte';
	import Slider from './Slider.svelte';

	export let playPauseTrack: () => void;
	export let prevTrack: () => void;
	export let nextTrack: () => void;
	export let cover: string;

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
	class="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 bg-grayA-3 p-4"
>
	<div class="flex items-center gap-2">
		<img src={cover} alt="" class="h-10 w-10 rounded-sm" />
		<p class="font-semibold text-gray-12">{$title}</p>
	</div>
	<div class="flex items-center gap-2">
		<Button intent="ghost" size="icon" on:click={prevTrack}>
			<SkipBack />
		</Button>
		<Button
			intent="primary"
			rounded="full"
			size="icon"
			on:click={playPauseTrack}
		>
			{#if $isPlaying}
				<Pause />
			{:else}
				<Play />
			{/if}
		</Button>
		<Button intent="ghost" size="icon" on:click={nextTrack}>
			<SkipForward />
		</Button>
		<Button intent="ghost" size="icon">
			<Heart />
		</Button>
	</div>
	<Slider />
	<div class="flex items-center gap-2">
		<Button intent="ghost" size="icon" on:click={handleShuffle}>
			<Shuffle class={`h-4 w-4 ${$isShuffled ? 'text-yellow-11' : ''}`} />
		</Button>
		<Button intent="ghost" size="icon" on:click={handleLoop}>
			<Repeat class={`h-4 w-4 ${$isLooped ? 'text-yellow-11' : ''}`} />
		</Button>
		<Button intent="ghost" size="icon" on:click={handleLoop}>
			<ListPlus class="h-4 w-4" />
		</Button>
	</div>
</section>
