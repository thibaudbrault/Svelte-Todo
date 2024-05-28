<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$components';
	import { CreatePlaylist, Musics } from '$modules';
	import { Collapsible } from 'bits-ui';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
</script>

<section class="flex flex-col gap-8">
	{#if $page.data.playlists.length > 0}
		<Collapsible.Root class="flex flex-col gap-2">
			{#each $page.data.playlists as playlist (playlist.id)}
				<div
					class="rounded-md border border-gray-5 px-4 py-2 hover:border-gray-6"
				>
					<div class="flex items-center justify-between">
						<p class="text-xl font-semibold">{playlist.name}</p>
						<Collapsible.Trigger class="rounded-md p-2 hover:bg-gray-4">
							<ChevronsUpDown />
						</Collapsible.Trigger>
					</div>
					<Collapsible.Content transition={slide}>
						<div class="flex flex-col gap-4">
							{#if playlist.musics.length > 0}
								<Musics />
							{:else}
								<p class="text-center text-2xl font-semibold capitalize">
									No musics
								</p>
							{/if}
							<form method="POST" use:enhance action="?/deletePlaylist">
								<input value={playlist.id} name="id" hidden />
								<input value={playlist.userId} name="userId" hidden />
								<Button intent="destructive" width="full">Delete</Button>
							</form>
						</div>
					</Collapsible.Content>
				</div>
			{/each}
		</Collapsible.Root>
	{:else}
		<p
			class="col-span-5 py-4 text-center text-xl font-semibold capitalize md:text-2xl"
		>
			No playlist
		</p>
	{/if}
	<CreatePlaylist />
</section>
