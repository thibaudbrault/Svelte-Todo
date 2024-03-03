<script lang="ts">
	import {
		currentTime,
		index,
		isPlaying,
		audio,
		albumLength,
		title,
	} from '$lib/store.js';
	import { format } from '$lib/utils';
	import { Player } from '$modules';
	import { Clock } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data;
	let musics = data.result;
	$albumLength = musics.length;
	let albumTitle = data.name;
	let cover = data.cover;

	let duration: number = 0;
	let showPlayer: boolean = false;

	let src = musics[$index].url;

	const loadTrack = (index: number) => {
		$isPlaying = false;
		$title = musics[index].title;
		$audio.src = musics[index].url;
		showPlayer = true;
		$audio.load();
	};

	const handleEnded = () => {
		$isPlaying = false;
		$currentTime = 0;
	};

	onMount(() => {
		$title = musics[$index].title;
		$audio.load();
	});
</script>

<section class="col-span-5 space-y-8 rounded-md p-2">
	<div class="h-full bg-gray-2">
		<div class="flex gap-4 p-4">
			<img src={cover} alt={albumTitle} class="h-56 w-56 rounded-md" />
			<div class="relative flex flex-1 flex-col justify-around">
				<small class="text-xs font-semibold text-grayA-11">Album</small>
				<h1 class="text-6xl font-bold">{albumTitle}</h1>
				<div>
					<p>Pokémon remake of the 2G</p>
					<p>{musics.length} titles</p>
				</div>
			</div>
		</div>
		<div class="w-full space-y-2 p-4">
			<div
				class="grid grid-cols-[30px_3fr_2fr_60px] border-b border-b-grayA-6 pb-2 font-normal text-gray-11"
			>
				<p>#</p>
				<p>Title</p>
				<p>Author</p>
				<p><Clock /></p>
			</div>
			<ol class="space-y-2">
				{#each musics as music, index}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<li
						on:click={() => loadTrack(index)}
						class="grid cursor-pointer grid-cols-[30px_3fr_2fr_60px] items-center rounded-md p-2 hover:bg-gray-4"
					>
						<p class="text-sm text-gray-11">{music.id}</p>
						<p class="text-2xl">{music.title}</p>
						<p class="capitalize">the author</p>
						<p>{format(music.duration)}</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
	<audio
		{src}
		bind:this={$audio}
		bind:duration
		bind:currentTime={$currentTime}
		on:ended={handleEnded}
	/>
	{#if showPlayer}
		<Player {duration} {musics} />
	{/if}
</section>
