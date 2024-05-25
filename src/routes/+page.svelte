<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$components';
	import { AudioLines, Heart, ListMusic } from 'lucide-svelte';
</script>

{#if $page.data.album.length > 0}
	<div class="flex flex-col gap-8">
		<div class="flex w-full items-center gap-8">
			<div class="space-y-2">
				<h2 class="text-2xl font-bold text-yellow-12">Random album</h2>
				<div
					class="relative flex w-72 flex-col items-center justify-center rounded-md border border-yellowA-6 bg-yellow-surface py-8 transition-all duration-300 ease-in-out"
				>
					<img
						src={$page.data.album[0].cover}
						alt={$page.data.album[0].name}
						class="z-10 size-44 rounded-md"
					/>
					<h3 class="z-10 truncate font-semibold">
						<a href={`/album/${$page.data.album[0].slug}`}
							>{$page.data.album[0].name}</a
						>
					</h3>
					<AudioLines
						class="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 transform opacity-20"
					/>
				</div>
			</div>
			{#if $page.data.user}
				<div class="min-w-72 space-y-2">
					<h2
						class="font-semibold lowercase text-gray-11"
						style="font-variant: small-caps;"
					>
						{$page.data.profile.name}'s statistics
					</h2>
					<ul class="flex w-full flex-col gap-2">
						<li
							class="flex items-center justify-between rounded-md bg-gray-3 px-4 py-2"
						>
							<div>
								<p
									class="text-sm lowercase text-gray-11"
									style="font-variant: small-caps;"
								>
									Likes
								</p>
								<p class="text-2xl font-bold">
									{$page.data.favoritesMusics.length}
								</p>
							</div>
							<Heart class="text-yellow-12" />
						</li>
						<li
							class="flex items-center justify-between rounded-md bg-gray-3 px-4 py-2"
						>
							<div>
								<p
									class="text-sm lowercase text-gray-11"
									style="font-variant: small-caps;"
								>
									Playlists
								</p>
								<p class="text-2xl font-bold">{$page.data.playlists.length}</p>
							</div>
							<ListMusic class="text-yellow-12" />
						</li>
					</ul>
				</div>
			{/if}
		</div>
		<div class="space-y-2">
			<div class="flex items-baseline gap-2">
				<h2 class="text-2xl font-bold">Latest albums</h2>
				<a
					href="/album/latest"
					class="text-xs font-semibold text-gray-11 hover:underline">Show all</a
				>
			</div>
			<div class="flex flex-wrap gap-1">
				{#each $page.data.latestAlbums as album}
					<Card
						title={album.name}
						alt={album.name}
						cover={album.cover}
						release={album.release}
						game={album.games.name}
						link={`/album/${album.slug}`}
					/>
				{/each}
			</div>
		</div>
		<div class="space-y-2">
			<div class="flex items-baseline gap-2">
				<h2 class="text-2xl font-bold">Popular albums</h2>
				<a
					href="/album/popular"
					class="text-xs font-semibold text-gray-11 hover:underline">Show all</a
				>
			</div>
			<div class="flex shrink-0 flex-wrap gap-1">
				{#each $page.data.popularAlbums as album}
					<Card
						title={album.name}
						alt={album.name}
						cover={album.cover}
						release={album.release}
						game={album.games.name}
						link={`/album/${album.slug}`}
					/>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<p
		class="flex h-full items-center justify-center text-center text-4xl font-semibold capitalize"
	>
		No album <br />Come back later
	</p>
{/if}
