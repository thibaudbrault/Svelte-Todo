<script lang="ts">
	import { Card } from '$components';

	const cards = [
		{
			title: 'Hello',
			desc: 'Hi',
		},
		{
			title: 'Goodbye',
			desc: 'Bye',
		},
	];
</script>

<section class="space-y-4 p-4">
	<h2 class="text-4xl font-bold">Library</h2>
	<div class="flex items-center gap-2">
		{#each cards as card}
			<Card title={card.title} desc={card.desc} />
		{/each}
	</div>
</section>
