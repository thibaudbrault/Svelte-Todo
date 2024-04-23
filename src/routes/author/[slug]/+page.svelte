<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button, Dropdown } from '$components';
	import type { SelectMusic } from '$lib/db';
	import { favoritesMusics, trackId } from '$lib/store';
	import { format, loadTrack, scrollIntoView } from '$lib/utils';
	import { AddToPlaylistD } from '$modules';
	import { Separator } from 'bits-ui';
	import { Heart, MoreHorizontal } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const handleClick = (index: number) => {
		$trackId = index;
		scrollIntoView($trackId);
		loadTrack();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowLeft' && $trackId > 0) {
			$trackId = $trackId - 1;
			scrollIntoView($trackId);
			loadTrack();
		} else if (event.key === 'ArrowRight' && $trackId < $page.data.length - 1) {
			$trackId = $trackId + 1;
			scrollIntoView($trackId);
			loadTrack();
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
		$page.data.favoritesMusics.forEach((music: SelectMusic) => {
			favoritesMusics.update((current) => current.add(music.id));
		});
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<div class="flex flex-col gap-4 p-4">
	<div class="flex flex-col gap-2">
		<h1 class="text-4xl font-bold md:text-5xl lg:text-6xl">
			{$page.data.author.name}
		</h1>
		<p class="text-gray-11">
			{$page.data.author.musicsToAuthors.length} titles
		</p>
	</div>
	<Separator.Root class="mx-auto h-px w-11/12 bg-gray-5" />
	<ul class="space-y-2">
		{#each $page.data.author.musicsToAuthors as musics, index}
			<div
				class={`flex w-full cursor-pointer items-center justify-between rounded-md p-2 ${$trackId === index ? 'bg-gray-12 text-gray-1' : 'hover:bg-grayA-5'}`}
			>
				<button
					id={`track-${index}`}
					on:click={() => handleClick(index)}
					class="flex flex-1 flex-col items-start gap-1"
				>
					<p class="text-left text-xl font-bold">{musics.music.name}</p>
				</button>
				<div class="flex items-center gap-8">
					<p class="text-sm font-medium">{format(musics.music.duration)}</p>
					{#if $page.data.session}
						{#if $favoritesMusics.has(musics.music.id)}
							<form
								method="POST"
								use:enhance
								action="?/removeFavoriteMusic"
								on:submit={() => handleFavorite(musics.music.id)}
							>
								<input value={musics.music.id} name="musicId" hidden />
								<input value={$page.data.user.id} name="userId" hidden />
								<Button
									intent="ghost"
									size="icon"
									class="text-red-500"
									type="submit"
								>
									<Heart class="fill-red-500" />
								</Button>
							</form>
						{:else}
							<form
								method="POST"
								use:enhance
								action="?/addFavoriteMusic"
								on:submit={() => handleFavorite(musics.music.id)}
							>
								<input value={musics.music.id} name="musicId" hidden />
								<input value={$page.data.user.id} name="userId" hidden />
								<Button
									intent="ghost"
									size="icon"
									class="text-inherit"
									type="submit"
								>
									<Heart />
								</Button>
							</form>
						{/if}
					{/if}
					<Dropdown>
						<MoreHorizontal slot="trigger" />
						<svelte:fragment slot="content">
							<AddToPlaylistD
								musicId={musics.music.id}
								triggerClass="font-semibold capitalize text-left hover:text-yellow-12"
							/>
						</svelte:fragment>
					</Dropdown>
				</div>
			</div>
		{/each}
	</ul>
</div>
