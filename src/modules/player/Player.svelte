<script lang="ts">
	import { Button } from '$components';
	import type { SelectMusic } from '$lib/db';
	import {
		audio,
		isLoading,
		isLooped,
		isPlaying,
		isShuffled,
		showPlayer,
		title,
	} from '$lib/store';
	import { nextTrack, playPauseTrack, prevTrack } from '$lib/utils';
	import {
		Heart,
		ListPlus,
		Loader2Icon,
		Pause,
		Play,
		Repeat,
		Shuffle,
		SkipBack,
		SkipForward,
		XIcon,
	} from 'lucide-svelte';
	import Progress from './Progress.svelte';

	export let musics: SelectMusic[];
	export let length: number;
	export let cover: string;
	export let raf: number;

	const handleLoop = () => {
		$isLooped = !$isLooped;
		$isShuffled = false;
	};

	const handleShuffle = () => {
		$isShuffled = !$isShuffled;
		$isLooped = false;
	};

	const handlePlaylist = () => {
		console.log('added');
	};

	const handleClose = () => {
		$showPlayer = false;
		$audio.pause();
	};
</script>

<section
	class="absolute bottom-0 left-0 right-0 grid h-24 grid-cols-[2fr_2fr_5fr_1fr] items-center justify-between gap-4 bg-black/90 p-4"
>
	<div class="flex items-center gap-2">
		<img src={cover} alt="" class="h-10 w-10 rounded-sm" />
		<p class="font-semibold text-gray-12">{$title}</p>
	</div>
	<div class="flex items-center gap-2">
		<Button
			intent="ghost"
			size="icon"
			on:click={() => prevTrack(musics, length)}
		>
			<SkipBack />
		</Button>
		<Button
			intent="primary"
			rounded="full"
			size="icon"
			on:click={() => playPauseTrack(raf)}
			disabled={$isLoading}
		>
			{#if $isLoading}
				<Loader2Icon class="animate-spin" />
			{:else if $isPlaying}
				<Pause />
			{:else}
				<Play />
			{/if}
		</Button>
		<Button
			intent="ghost"
			size="icon"
			on:click={() => nextTrack(musics, length)}
		>
			<SkipForward />
		</Button>
		<Button intent="ghost" size="icon">
			<Heart />
		</Button>
	</div>
	<Progress />
	<div class="flex items-center gap-2">
		<Button intent="ghost" size="icon" on:click={handleShuffle}>
			<Shuffle class={`h-4 w-4 ${$isShuffled ? 'text-yellow-11' : ''}`} />
		</Button>
		<Button intent="ghost" size="icon" on:click={handleLoop}>
			<Repeat class={`h-4 w-4 ${$isLooped ? 'text-yellow-11' : ''}`} />
		</Button>
		<Button intent="ghost" size="icon" on:click={handlePlaylist}>
			<ListPlus class="h-4 w-4" />
		</Button>
	</div>
	<button class="absolute right-1 top-1" on:click={handleClose}>
		<XIcon class="h-4 w-4" />
	</button>
</section>
