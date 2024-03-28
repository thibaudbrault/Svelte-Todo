<script lang="ts">
	import { page } from '$app/stores';
	import { Button, ScrollArea } from '$components';
	import { trackId } from '$lib/store';
	import { format } from '$lib/utils';
	import { AddMusic } from '$modules';
	import { Separator } from 'bits-ui';
	import { Heart, MoreHorizontal } from 'lucide-svelte';

	export let selectedTrack: number | null;
	export let loadTrack: () => void;

	$: {
		selectedTrack = $trackId;
	}

	let favorites: number[] = [];

	const handleFavorite = (musicId: number) => {
		const index = favorites.indexOf(musicId);
		if (index !== -1) {
			favorites.splice(index, 1);
			favorites = favorites;
		} else {
			favorites.push(musicId);
			favorites = favorites;
		}
	};
</script>

<div class="w-full space-y-2 p-4">
	<Separator.Root class="mx-auto h-px w-11/12 bg-gray-5" />
	{#if $page.data.musics.length > 0}
		<div class="h-[700px]">
			<ScrollArea>
				<div class="space-y-2 pr-4">
					{#each $page.data.musics as music, index}
						<button
							on:click={() => {
								$trackId = index;
								loadTrack();
							}}
							class={`flex w-full cursor-pointer items-center justify-between rounded-md p-2 ${selectedTrack === index ? 'bg-gray-12 text-gray-1' : 'hover:bg-grayA-5'}`}
						>
							<div class="flex flex-col items-start gap-1">
								<p class="text-xl font-bold">{music.name}</p>
								{#each music.musicsToAuthors as authors}
									<p
										class="flex flex-wrap items-center gap-2 text-xs font-medium capitalize"
									>
										{authors.author.name}
									</p>
								{/each}
							</div>
							<div class="flex items-center gap-8">
								<p class="text-sm font-medium">{format(music.duration)}</p>
								<Button
									intent="ghost"
									size="icon"
									class={`${favorites.includes(music.id) ? 'text-red-400' : 'text-inherit'}`}
									on:click={() => handleFavorite(music.id)}
								>
									<Heart
										class={`${favorites.includes(music.id) ? 'fill-red-500' : 'bg-transparent'}`}
									/>
								</Button>
								<p><MoreHorizontal /></p>
							</div>
						</button>
					{/each}
				</div>
			</ScrollArea>
		</div>
	{:else}
		<p class="col-span-5 py-4 text-center text-xl font-bold capitalize">
			No music
		</p>
	{/if}
	<AddMusic />
</div>
