<script lang="ts">
	import { Card } from '$components';
	export let data;
	console.log(data.result);

	const albums = [
		{
			title: 'HeartGold - SoulSilver',
			desc: 'Hi',
			alt: 'HeartGold - SoulSilver cover',
			cover: '',
		},
		{
			title: 'Red - Blue',
			desc: 'Hi',
			alt: 'Red - Blue cover',
			cover: '',
		},
		{
			title: 'Diamond - Pearl',
			desc: 'Hi',
			alt: 'Diamond - Pearl cover',
			cover: '',
		},
		{
			title: 'HeartGold - SoulSilver',
			desc: 'Hi',
			alt: 'HeartGold - SoulSilver cover',
			cover: '',
		},
	];
</script>

<section class="col-span-5 space-y-8 p-4">
	<div class="space-y-4">
		<h2 class="text-2xl font-semibold">Latest</h2>
		<div class=" grid grid-cols-6 gap-6">
			{#each albums as album}
				<Card
					title={album.title}
					desc={album.desc}
					alt={album.alt}
					cover={album.cover}
				/>
			{/each}
		</div>
	</div>
	<div class="space-y-4">
		<h2 class="text-2xl font-semibold">Popular</h2>
		<div class=" grid grid-cols-6 gap-6">
			{#each albums as album}
				<Card
					title={album.title}
					desc={album.desc}
					alt={album.alt}
					cover={album.cover}
				/>
			{/each}
		</div>
	</div>
</section>
