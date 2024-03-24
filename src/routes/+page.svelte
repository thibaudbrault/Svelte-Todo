<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$components';
</script>

<div class="space-y-4">
	<h2 class="text-2xl font-semibold">Latest</h2>
	<div class="flex flex-wrap gap-6">
		{#each $page.data.albums as album}
			<Card
				title={album.name}
				alt={album.name}
				cover={album.cover}
				link={`/album/${album.slug}`}
			/>
		{/each}
	</div>
</div>
<div class="space-y-4">
	<h2 class="text-2xl font-semibold">Popular</h2>
	<div class="flex flex-wrap gap-6">
		{#each $page.data.albums as album}
			<Card
				title={album.name}
				alt={album.name}
				cover={album.cover}
				link={`/album/${album.slug}`}
			/>
		{/each}
	</div>
</div>
