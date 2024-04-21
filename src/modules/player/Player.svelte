<script lang="ts">
	import { Button } from '$components';
	import {
		audio,
		cover,
		isPlayerOpen,
		isLoading,
		isLooped,
		isPlaying,
		isShuffled,
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
	import { onMount } from 'svelte';
	import Progress from './Progress.svelte';

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
		$isPlayerOpen = false;
		$isPlaying = false;
		$audio.pause();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			playPauseTrack(raf);
		}
	};

	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<div
	class="bodrer-t-gray-5 fixed bottom-0 left-0 right-0 hidden grid-cols-[2fr_2fr_5fr_1fr] items-center justify-between gap-4 rounded-t-md border-t bg-gray-1 px-4 py-6 md:grid"
>
	<div class="flex items-center gap-2">
		<img src={$cover} alt="" class="h-16 w-16 rounded-sm" />
		<p class="text-xl font-semibold text-gray-12">{$title}</p>
	</div>
	<div class="flex items-center gap-2">
		<Button intent="ghost" size="icon" on:click={() => prevTrack()}>
			<SkipBack />
		</Button>
		<Button
			intent="primary"
			rounded="full"
			size="icon"
			on:click={() => playPauseTrack(raf)}
			type="button"
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
		<Button intent="ghost" size="icon" on:click={() => nextTrack()}>
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
</div>
<div
	class="bodrer-t-gray-5 fixed bottom-0 left-0 right-0 flex flex-col rounded-t-md border-t bg-gray-1 md:hidden"
>
	<div class="flex flex-col items-center justify-center gap-8 px-2 py-8">
		<div class="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-9" />
		<div class="flex flex-col items-center gap-2">
			<img
				src={$cover}
				alt=""
				class="mx-auto max-w-56 rounded-md border border-gray-5"
			/>
			<p class="text-center text-2xl font-semibold text-gray-12">{$title}</p>
		</div>
		<div class="flex items-center gap-4">
			<Button intent="ghost" size="icon" on:click={() => prevTrack()}>
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
					<Loader2Icon class="h-8 w-8 animate-spin" />
				{:else if $isPlaying}
					<Pause class="h-8 w-8" />
				{:else}
					<Play class="h-8 w-8" />
				{/if}
			</Button>
			<Button intent="ghost" size="icon" on:click={() => nextTrack()}>
				<SkipForward />
			</Button>
		</div>
		<Progress />
		<div class="flex items-center gap-4">
			<Button intent="ghost" size="icon">
				<Heart class="h-4 w-4" />
			</Button>
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
	</div>
</div>
