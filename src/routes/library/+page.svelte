<script lang="ts">
	import { Card } from '$components';

	let audio: HTMLAudioElement;
	let isPaused: boolean = false;
	const albums = [
		{
			title: 'HeartGold - SoulSilver',
			desc: 'Hi',
			alt: 'HeartGold - SoulSilver cover',
			cover: '',
		},
	];

	const playPause = () => {
		isPaused = !isPaused;
		if (isPaused) {
			audio.play();
		} else {
			audio.pause();
		}
	};
</script>

<section class="space-y-4 p-4">
	<h2 class="text-4xl font-bold">Library</h2>
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
	<p>{isPaused}</p>
	<button on:click={playPause}>{isPaused ? 'Pause' : 'Play'}</button>
	<audio controls src="" bind:this={audio} />
</section>
