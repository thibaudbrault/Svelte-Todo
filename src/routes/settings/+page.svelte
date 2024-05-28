<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$components';
	import { UpdateAlbum, UpdateCompany, UpdateGame } from '$modules';
	import { Separator } from 'bits-ui';
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl font-bold md:text-5xl lg:text-6xl">Settings</h1>
	<Separator.Root class="mx-auto h-px w-11/12 bg-gray-5" />
	<div class="flex flex-col gap-4">
		<h2 class="text-3xl font-semibold">Albums</h2>
		<div class="flex flex-col items-start gap-2">
			{#each $page.data.albums as album}
				<Card
					title={album.name}
					alt={album.name}
					cover={album.cover}
					release={album.release}
					game={album.games.name}
					link=""
				>
					<UpdateAlbum {album} slot="form" />
				</Card>
			{/each}
		</div>
	</div>
	<div class="flex flex-col gap-4">
		<h2 class="text-3xl font-semibold">Games</h2>
		<div class="flex flex-col items-start gap-2">
			{#each $page.data.games as game}
				<UpdateGame {game} />
			{/each}
		</div>
	</div>
	<div class="flex flex-col gap-4">
		<h2 class="text-3xl font-semibold">Companies</h2>
		<div class="flex flex-col items-start gap-2">
			{#each $page.data.companies as company}
				<UpdateCompany {company} />
			{/each}
		</div>
	</div>
</div>
