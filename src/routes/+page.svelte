<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$components';
	import { Heart, ListMusic } from 'lucide-svelte';
</script>

<div class="flex flex-col gap-8">
	<div class="flex w-full items-center gap-8">
		<div class="space-y-2">
			<h2 class="text-2xl font-bold text-yellow-12">Random album</h2>
			<Card
				title={$page.data.album[0].name}
				alt={$page.data.album[0].name}
				cover={$page.data.album[0].cover}
				release={$page.data.album[0].release}
				game=""
				link={`/album/${$page.data.album[0].slug}`}
			/>
		</div>
		{#if $page.data.user}
			<div class="min-w-72 space-y-2">
				<h2
					class="font-semibold lowercase text-gray-11"
					style="font-variant: small-caps;"
				>
					{$page.data.user.name}'s statistics
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
		<h2 class="text-2xl font-bold">Latest albums</h2>
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
		<h2 class="text-2xl font-bold">Popular albums</h2>
		<div class="flex flex-wrap gap-1">
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
