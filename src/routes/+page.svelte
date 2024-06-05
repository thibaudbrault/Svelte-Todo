<script lang="ts">
	import { page } from '$app/stores';
	import { LatestSlider, PopularSlider } from '$modules';
</script>

<div class="grid grid-cols-[2fr_1fr] gap-2">
	<div class="space-y-8 overflow-x-hidden border-r border-r-gray-6 pr-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-bold">Games</h2>
			<div class="grid auto-cols-max grid-flow-col gap-6 overflow-x-hidden">
				{#each $page.data.games as game}
					<div
						class="relative flex size-48 items-center justify-center rounded-md bg-gray-3 bg-cover bg-center bg-no-repeat p-4 text-center"
						style="background-image: url({game.cover})"
					>
						<a
							href={`/game/${game.value}`}
							class="z-10 text-3xl font-semibold hover:text-yellow-12"
							>{game.name}</a
						>
						<div class="absolute inset-0 rounded-md bg-gray-1 opacity-20" />
					</div>
				{/each}
			</div>
		</div>
		<LatestSlider />
		<PopularSlider />
	</div>
	<div class="pl-4">
		<ul class="space-y-2">
			{#each $page.data.popularAlbums as album, index}
				<li class="flex items-center gap-1">
					<p class="text-2xl font-semibold">{index + 1}</p>
					<img src={album.cover} alt={album.name} class="size-20 rounded-md" />
					<div>
						<a
							href={`/album/${album.slug}`}
							class="font-semibold hover:text-yellow-12">{album.name}</a
						>
						<p class="text-sm text-gray-11">{album.games.name}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
