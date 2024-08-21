<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button, Dropdown } from '$components';
	import {
		authors,
		cover,
		favoritesMusics,
		length,
		musics,
		trackId,
	} from '$lib/store';
	import { format, loadTrack, scrollIntoView } from '$lib/utils';
	import { UpdateMusic } from '$modules';
	import { Heart, ListPlus, MoreVertical } from 'lucide-svelte';

	export let isFavorites: boolean = false;
	export let isPlaylist: boolean = false;

	const handleClick = async (index: number) => {
		if (!isFavorites && !isPlaylist) {
			$cover = $page.data.album.cover;
		}
		$trackId = index;
		$authors = $musics[$trackId].authors;
		scrollIntoView($trackId);
		loadTrack();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		event.preventDefault();
		if (event.key === 'ArrowLeft') {
			$trackId = ($trackId - 1 + $length) % $length; // Handle negative index
		} else if (event.key === 'ArrowRight') {
			$trackId = ($trackId + 1) % $length;
		}
		if (!isFavorites && !isPlaylist) {
			$cover = $page.data.album.cover;
		}
		$authors = $musics[$trackId].authors;
		scrollIntoView($trackId);
		loadTrack();
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
</script>

{#if $musics.length > 0}
	<div class="hidden space-y-2 md:block">
		{#each $musics as music, index}
			<div
				class={`flex w-full cursor-pointer items-center justify-between rounded-md p-2 ${$trackId === index ? 'bg-gray-12 text-gray-1' : 'hover:bg-grayA-5'}`}
			>
				{#if $page.data.user}
					<form
						method="post"
						use:enhance={() => {
							return ({ update }) => {
								update({ reset: false });
							};
						}}
						action="?/updateHistory"
						class="flex h-full w-full items-center gap-2"
					>
						<input value={music.id} name="musicId" hidden />
						<input value={$page.data.profile.id} name="userId" hidden />
						{#if isPlaylist}
							<img
								src={music.album.cover}
								alt=""
								width="48"
								height="48"
								class="rounded-md"
							/>
						{/if}
						<button
							id={`track-${index}`}
							on:click={() => handleClick(index)}
							on:keydown={handleKeyDown}
							class="flex w-full flex-1 flex-col items-start gap-1"
						>
							<p class="text-left text-xl font-bold">{music.name}</p>
							<ul class="flex items-center gap-2">
								{#each music.authors as authors}
									<li class=" text-sm font-medium capitalize">
										{authors.author.name}
									</li>
								{/each}
							</ul>
						</button>
					</form>
				{:else}
					<div class="flex items-center gap-2">
						{#if isPlaylist}
							<img
								src={music.album.cover}
								alt=""
								width="48"
								height="48"
								class="rounded-md"
							/>
						{/if}
						<button
							id={`track-${index}`}
							on:click={() => handleClick(index)}
							on:keydown={handleKeyDown}
							class="flex flex-1 flex-col items-start gap-1"
						>
							<p class="text-left text-xl font-bold">{music.name}</p>
							<ul class="flex items-center gap-2">
								{#each music.authors as authors}
									<li class=" text-xs font-medium capitalize">
										{authors.author.name}
									</li>
								{/each}
							</ul>
						</button>
					</div>
				{/if}
				<div class="flex items-center gap-2">
					<p class="text-sm font-medium">{format(music.duration)}</p>
					{#if $page.data.session}
						<form
							method="POST"
							use:enhance
							action="?/updateFavoriteMusic"
							on:submit={() => handleFavorite(music.id)}
						>
							<input value={music.id} name="musicId" hidden />
							<input value={$page.data.profile.id} name="userId" hidden />
							{#if $favoritesMusics.has(music.id)}
								<input value="remove" name="action" hidden />
								<Button
									aria-label="Remove from favorites"
									intent="ghost"
									size="icon"
									class="text-red-500"
									type="submit"
								>
									<Heart class="fill-red-500" />
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
									<Heart />
								</Button>
							{/if}
						</form>
						<div
							class="flex w-fit cursor-pointer items-center justify-center p-2"
						>
							<Dropdown>
								<ListPlus class="size-5" slot="trigger" />
								<svelte:fragment slot="content">
									{#each $page.data.playlists as playlist}
										<form
											method="POST"
											use:enhance
											action="?/updatePlaylistMusics"
										>
											<input
												value={$page.data.profile.id}
												name="userId"
												hidden
											/>
											<input
												value={$musics[$trackId].id}
												name="musicId"
												hidden
											/>
											<input value={playlist.name} name="name" hidden />
											{#if $musics[index].playlists.find((item) => item.playlistId === playlist.id)}
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
					{/if}
					<Dropdown>
						<MoreVertical slot="trigger" />
						<svelte:fragment slot="content">
							{#each music.authors as authors}
								<a href={`/author/${authors.author.slug}`} class="triggerClass">
									{authors.author.name}
								</a>
							{/each}
							{#if $page.data.profile?.role === 'admin'}
								<UpdateMusic musicId={music.id} />
							{/if}
						</svelte:fragment>
					</Dropdown>
				</div>
			</div>
		{/each}
	</div>
	<div class="block md:hidden">
		{#each $musics as music, index}
			<div
				class={`flex w-full cursor-pointer items-center justify-between gap-1 rounded-md p-2 ${$trackId === index ? 'bg-gray-12 text-gray-1' : 'hover:bg-grayA-5'}`}
			>
				<button
					id={`track-${index}`}
					on:click={() => handleClick(index)}
					class="flex flex-1 flex-col items-start gap-1"
				>
					<p class="text-left font-bold">{music.name}</p>
					<ul class="flex items-center gap-2">
						{#each music.authors as authors}
							<li class=" text-xs font-medium capitalize">
								{authors.author.name}
							</li>
						{/each}
					</ul>
				</button>
				<div class="flex items-center gap-8">
					<Dropdown>
						<MoreVertical slot="trigger" />
						<svelte:fragment slot="content">
							{#each music.authors as authors}
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
{:else}
	<p
		class="col-span-5 flex items-center justify-center py-4 text-center text-xl font-semibold capitalize md:text-4xl"
	>
		No musics
	</p>
{/if}
