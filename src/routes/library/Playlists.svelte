<script>
	import { page } from '$app/stores';
	import { CreatePlaylist, DeletePlaylist, UpdatePlaylist } from '$modules';
</script>

<section class="space-y-8">
	{#if $page.data.playlists.length > 0}
		<div class="space-y-2">
			{#each $page.data.playlists as playlist (playlist.id)}
				<div
					class="group flex items-center justify-between gap-1 rounded-md p-2 hover:bg-gray-4"
				>
					<div class="flex items-center gap-4">
						<img
							src={playlist.musics[0]?.album.cover ?? ''}
							class="rounded-md"
							width="52"
							height="52"
							alt={playlist.musics[0]?.album.name ?? ''}
						/>
						<div class="space-x-2">
							<a
								aria-label={`Go to playlist ${playlist.name}`}
								class="text-2xl font-semibold group-hover:text-yellow-12"
								href={`/playlist/${playlist.name}`}
							>
								{playlist.name}
							</a>
							<small class="text-xs text-gray-11">
								{playlist.musics.length} tracks
							</small>
						</div>
					</div>
					<div class="z-10 flex items-center gap-2">
						<UpdatePlaylist {playlist} />
						<DeletePlaylist {playlist} />
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p
			class="col-span-5 py-4 text-center text-xl font-semibold capitalize md:text-2xl"
		>
			No playlist
		</p>
	{/if}
	<CreatePlaylist />
</section>
