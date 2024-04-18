<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button, Dropdown } from '$components';
	import { trackId } from '$lib/store';
	import { format, loadTrack, scrollIntoView } from '$lib/utils';
	import { Heart, MoreHorizontal } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { Drawer } from 'vaul-svelte';

	let selectedTrack: number | null = null;

	const handleClick = (index: number) => {
		$trackId = index;
		selectedTrack = index;
		scrollIntoView($trackId);
		loadTrack($page.data.musics, $page.data.length);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowLeft' && $trackId > 0) {
			$trackId = $trackId - 1;
			scrollIntoView($trackId);
			loadTrack($page.data.musics, $page.data.length);
		} else if (event.key === 'ArrowRight' && $trackId < $page.data.length - 1) {
			$trackId = $trackId + 1;
			scrollIntoView($trackId);
			loadTrack($page.data.musics, $page.data.length);
		}
	};

	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

{#if $page.data.musics.length > 0}
	<div class="hidden space-y-2 md:block">
		{#each $page.data.musics as music, index}
			<div
				class={`flex w-full cursor-pointer items-center justify-between rounded-md p-2 ${selectedTrack === index ? 'bg-gray-12 text-gray-1' : 'hover:bg-grayA-5'}`}
			>
				<Drawer.Trigger
					id={`track-${index}`}
					on:click={() => handleClick(index)}
					class="flex flex-1 flex-col items-start gap-1"
				>
					<p class="text-xl font-bold">{music.name}</p>
					{#each music.musicsToAuthors as authors}
						<p
							class="flex flex-wrap items-center gap-2 text-xs font-medium capitalize"
						>
							{authors.author.name}
						</p>
					{/each}
				</Drawer.Trigger>
				<div class="flex items-center gap-8">
					<p class="text-sm font-medium">{format(music.duration)}</p>
					{#if $page.data.session}
						{#if $page.data.favoritesMusics.some((fav) => fav.id === music.id)}
							<form method="POST" use:enhance action="?/removeFavoriteMusic">
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
					{/if}
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
	<div class="block md:hidden">
		{#each $page.data.musics as music, index}
			<div
				class={`flex w-full cursor-pointer items-center justify-between gap-1 rounded-md p-2 ${$trackId === index ? 'bg-gray-12 text-gray-1' : 'hover:bg-grayA-5'}`}
			>
				<Drawer.Trigger
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
				</Drawer.Trigger>
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
	</div>
{:else}
	<p class="col-span-5 py-4 text-center text-xl font-bold capitalize">
		No music
	</p>
{/if}
