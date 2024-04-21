<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button, Dropdown } from '$components';
	import type { SelectMusic } from '$lib/db';
	import { musics, trackId, length, favoritesMusics } from '$lib/store';
	import { format, loadTrack } from '$lib/utils';
	import { Heart, MoreHorizontal } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const handleClick = (index: number) => {
		$trackId = index;
		loadTrack();
	};

	const handleFavorite = (id: string) => {
		favoritesMusics.update((currentFavorites) => {
			const newFavorites = new Set(currentFavorites);
			newFavorites.delete(id);
			return newFavorites;
		});
	};

	onMount(() => {
		$musics = $page.data.favoritesMusics;
		$length = $page.data.favoritesMusics.length;
		$page.data.favoritesMusics.forEach((music: SelectMusic) => {
			favoritesMusics.update((current) => current.add(music.id));
		});
	});
</script>

{#if $page.data.favoritesMusics.length > 0}
	<div class="hidden space-y-2 md:block">
		{#each $page.data.favoritesMusics as music, index}
			<div
				class={`flex w-full cursor-pointer items-center justify-between rounded-md p-2 ${$trackId === index ? 'bg-gray-12 text-gray-1' : 'hover:bg-grayA-5'}`}
			>
				<button
					id={`track-${index}`}
					on:click={() => handleClick(index)}
					class="flex flex-1 flex-col items-start gap-1"
				>
					<p class="text-left text-xl font-bold">{music.name}</p>
					<!-- {#each music.musicsToAuthors as authors}
						<p
							class="flex flex-wrap items-center gap-2 text-xs font-medium capitalize"
						>
							{authors.author.name}
						</p>
					{/each} -->
				</button>
				<div class="flex items-center gap-8">
					<p class="text-sm font-medium">{format(music.duration)}</p>
					<form
						method="POST"
						use:enhance
						action="?/removeFavoriteMusic"
						on:submit={() => handleFavorite(music.id)}
					>
						<input value={music.id} name="musicId" hidden />
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
					<Dropdown>
						<MoreHorizontal slot="trigger" />
						<svelte:fragment slot="content">
							{#each music.musicsToAuthors as authors}
								<p class="font-semibold capitalize">
									{authors.author.name}
								</p>
							{/each}
						</svelte:fragment>
					</Dropdown>
				</div>
			</div>
		{/each}
	</div>
	<!-- <div class="block md:hidden">
		{#each $page.data.favoritesMusics as music, index}
			<div
				class={`flex w-full cursor-pointer items-center justify-between gap-1 rounded-md p-2 ${$trackId === index ? 'bg-gray-12 text-gray-1' : 'hover:bg-grayA-5'}`}
			>
				<button
					id={`track-${index}`}
					on:click={() => handleClick(index)}
					class="flex flex-1 flex-col items-start gap-1"
				>
					<p class="text-left font-bold">{music.name}</p>
					{#each music.musicsToAuthors as authors}
						<p
							class="flex flex-wrap items-center gap-2 text-xs font-medium capitalize"
						>
							{authors.author.name}
						</p>
					{/each}
				</button>
				<div class="flex items-center gap-8">
					<Dropdown>
						<MoreHorizontal slot="trigger" />
						<svelte:fragment slot="content">
							{#each music.musicsToAuthors as authors}
								<p class="font-semibold capitalize">
									{authors.author.name}
								</p>
							{/each}
						</svelte:fragment>
					</Dropdown>
				</div>
			</div>
		{/each}
	</div> -->
{:else}
	<p class="col-span-5 py-4 text-center text-xl font-bold capitalize">
		No music
	</p>
{/if}
