<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Dropdown } from '$components';
	import {
		authors,
		cover,
		isLoading,
		isLooped,
		isPlaying,
		isShuffled,
		musics,
		title,
		trackId,
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

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
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
	class="fixed bottom-0 left-0 right-0 hidden grid-cols-[300px_1fr_100px] items-center justify-center gap-4 border-t border-t-yellow-5 bg-gray-1 px-4 py-2 md:grid"
>
	<div class="flex items-center gap-2">
		<img
			src={$cover}
			alt=""
			class="h-16 w-16 rounded-md border border-grayA-5"
		/>
		<div class="flex flex-col items-start justify-between">
			<p class="font-semibold text-gray-12">{$title}</p>
			<div class="flex items-center gap-1">
				{#each $authors as authors}
					<p class="text-sm">{authors.author.name}</p>
				{/each}
			</div>
		</div>
	</div>
	<div class="flex flex-1 flex-col items-center gap-2">
		<div class="flex items-center justify-center gap-2">
			<Button intent="ghost" size="icon" on:click={handleShuffle}>
				<Shuffle class={`size-5 ${$isShuffled ? 'text-yellow-11' : ''}`} />
			</Button>
			<Button intent="ghost" size="icon" on:click={() => prevTrack()}>
				<SkipBack class="size-5" />
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
				<SkipForward class="size-5" />
			</Button>
			<Button intent="ghost" size="icon" on:click={handleLoop}>
				<Repeat class={`size-5 ${$isLooped ? 'text-yellow-11' : ''}`} />
			</Button>
		</div>
		<Progress />
	</div>
	<div class="flex items-center gap-2">
		<div class="flex w-fit cursor-pointer items-center justify-center p-2">
			<Dropdown>
				<ListPlus class="size-5" slot="trigger" />
				<svelte:fragment slot="content">
					{#each $page.data.playlists as playlist}
						<form>
							<input value={$page.data.profile.id} name="userId" hidden />
							<input value={$musics[$trackId].id} name="musicId" hidden />
							<input value={playlist.name} name="name" hidden />
							<button>{playlist.name}</button>
						</form>
					{/each}
				</svelte:fragment>
			</Dropdown>
		</div>
		<Button intent="ghost" size="icon">
			<Heart class="size-5" />
		</Button>
	</div>
</div>
<div
	class="bodrer-t-yellow-5 fixed bottom-0 left-0 right-0 flex flex-col rounded-t-md border-t bg-gray-1 md:hidden"
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
			<div class="flex w-fit cursor-pointer items-center justify-center p-2">
				<ListPlus class="h-4 w-4" />
			</div>
		</div>
	</div>
</div>
