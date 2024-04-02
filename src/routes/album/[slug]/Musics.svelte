<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button, ScrollArea } from '$components';
	import { trackId } from '$lib/store';
	import { format } from '$lib/utils';
	import { loadTrack } from '$lib/utils/functions';
	import { AddMusic } from '$modules';
	import { Heart, MoreHorizontal } from 'lucide-svelte';

	export let selectedTrack: number;

	$: selectedTrack = $trackId;

	const handleClick = (index: number) => {
		$trackId = index;
		loadTrack($page.data.musics, selectedTrack, $page.data.length);
	};
</script>

{#if $page.data.musics.length > 0}
	<div class="h-[700px]">
		<ScrollArea>
			<div class="space-y-2 pr-4">
				{#each $page.data.musics as music, index}
					<button
						on:click={() => handleClick(index)}
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
							{#if $page.data.session}
								{#if $page.data.favoritesMusics.some((fav) => fav.id === music.id)}
									<form
										method="POST"
										use:enhance
										action="?/removeFavoriteMusic"
									>
										<input value={music.id} name="musicId" hidden />
										<input value={$page.data.user.id} name="userId" hidden />
										<Button intent="ghost" size="icon" class="text-red-400">
											<Heart class="fill-red-400" />
										</Button>
									</form>
								{:else}
									<form method="POST" use:enhance action="?/addFavoriteMusic">
										<input value={music.id} name="musicId" hidden />
										<input value={$page.data.user.id} name="userId" hidden />
										<Button intent="ghost" size="icon" class="text-inherit">
											<Heart />
										</Button>
									</form>
								{/if}
							{:else}
								<div />
							{/if}
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
{#if $page.data.user && $page.data.user.role === 'admin'}
	<AddMusic />
{/if}
