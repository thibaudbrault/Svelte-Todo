<script lang="ts">
	import { Button, Card } from '$components';
	export let data;
	let albums = data.result;
</script>

<section class="col-span-5 space-y-8 p-4">
	<div class="space-y-4">
		<h2 class="text-2xl font-semibold">Latest</h2>
		<div class=" grid grid-cols-6 gap-6">
			{#each albums as album}
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
		<div class=" grid grid-cols-6 gap-6">
			{#each albums as album}
				<Card
					title={album.name}
					alt={album.name}
					cover={album.cover}
					link={`/album/${album.slug}`}
				/>
			{/each}
		</div>
	</div>
	<form action="?/createAlbum" method="POST">
		<label for="name">Name</label>
		<input type="text" id="name" name="name" class="text-gray-900" />
		<input type="file" name="cover" />
		<Button>Add album</Button>
	</form>
</section>
