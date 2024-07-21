<script>
	import { page } from '$app/stores';
	import { CreatePlaylist } from '$modules';
	import { X } from 'lucide-svelte';
</script>

<section class="space-y-8">
	{#if $page.data.playlists.length > 0}
		<div class="space-y-2">
			{#each $page.data.playlists as playlist (playlist.id)}
				<a
					class="group flex items-center justify-between gap-1 rounded-md p-2 hover:bg-gray-4"
					href={`/playlist/${playlist.name}`}
				>
					<span class="text-2xl font-semibold group-hover:text-yellow-12">
						{playlist.name}
					</span>
					<form>
						<button class="hover:text-red-9">
							<X class="size-5" />
						</button>
					</form>
				</a>
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
