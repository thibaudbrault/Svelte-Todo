<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Dropdown, Tooltip } from '$components';
	import {
		authors,
		cover,
		favoritesMusics,
		isLoading,
		isLooped,
		isPlaying,
		isShuffled,
		isZen,
		musics,
		title,
		trackId,
	} from '$lib/store';
	import { nextTrack, playPauseTrack, prevTrack } from '$lib/utils';
	import {
		Heart,
		ListPlus,
		Loader2Icon,
		LoaderPinwheel,
		Pause,
		Play,
		Repeat,
		Shuffle,
		SkipBack,
		SkipForward,
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Progress from './Progress.svelte';
	import { enhance } from '$app/forms';

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

	const handleFavorite = (id: string) => {
		favoritesMusics.update((currentFavorites) => {
			const newFavorites = new Set(currentFavorites);
			if (newFavorites.has(id)) {
				newFavorites.delete(id);
			} else {
				newFavorites.add(id);
			}
			return newFavorites;
		});
	};

	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<div
	class="fixed bottom-0 left-0 right-0 hidden grid-cols-[300px_1fr_150px] items-center justify-center gap-4 border-t border-t-yellow-5 bg-gray-1 px-4 py-2 md:grid"
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
			<Button
				aria-label="Shuffle"
				intent="ghost"
				size="icon"
				on:click={handleShuffle}
			>
				<Shuffle class={`size-5 ${$isShuffled ? 'text-yellow-11' : ''}`} />
			</Button>
			<Button
				aria-label="Previous track"
				intent="ghost"
				size="icon"
				on:click={() => prevTrack()}
			>
				<SkipBack class="size-5" />
			</Button>
			<Button
				aria-label={$isPlaying ? 'Pause' : 'Play'}
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
			<Button
				aria-label="Next track"
				intent="ghost"
				size="icon"
				on:click={() => nextTrack()}
			>
				<SkipForward class="size-5" />
			</Button>
			<Button
				aria-label="Loop"
				intent="ghost"
				size="icon"
				on:click={handleLoop}
			>
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
						<form method="POST" use:enhance action="?/updatePlaylist">
							<input value={$page.data.profile.id} name="userId" hidden />
							<input value={$musics[$trackId].id} name="musicId" hidden />
							<input value={playlist.name} name="name" hidden />
							{#if $musics[$trackId].playlists.find((item) => item.playlistId === playlist.id)}
								<input value="remove" name="action" hidden />
								<button
									aria-label={`Remove from playlist ${playlist.name}`}
									class="text-yellow-12"
									>{playlist.name}
								</button>
							{:else}
								<input value="add" name="action" hidden />

								<button
									aria-label={`Add to playlist ${playlist.name}`}
									class="hover:text-yellow-12"
									>{playlist.name}
								</button>
							{/if}
						</form>
					{/each}
				</svelte:fragment>
			</Dropdown>
		</div>
		<form
			method="POST"
			use:enhance
			action="?/updateFavoriteMusic"
			on:submit={() => handleFavorite($musics[$trackId].id)}
		>
			<input value={$musics[$trackId].id} name="musicId" hidden />
			<input value={$page.data.profile.id} name="userId" hidden />
			{#if $favoritesMusics.has($musics[$trackId].id)}
				<input value="remove" name="action" hidden />
				<Button
					aria-label="Remove from favorites"
					intent="ghost"
					size="icon"
					class="text-red-500"
					type="submit"
				>
					<Heart class="size-5 fill-red-500" />
				</Button>
			{:else}
				<input value="add" name="action" hidden />
				<Button
					aria-label="Add to favorites"
					intent="ghost"
					size="icon"
					class="text-inherit"
					type="submit"
				>
					<Heart class="size-5" />
				</Button>
			{/if}
		</form>
		<Tooltip>
			<Button
				aria-label="Focus mode"
				slot="trigger"
				intent="ghost"
				size="icon"
				on:click={() => {
					$isZen = !$isZen;
				}}
			>
				<LoaderPinwheel class={`${$isZen ? 'text-yellow-12' : ''} size-5`} />
			</Button>
			<p slot="content" class="font-medium">Focus mode</p>
		</Tooltip>
	</div>
</div>
