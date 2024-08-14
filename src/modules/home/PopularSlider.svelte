<script lang="ts">
	import { page } from '$app/stores';
	import { Card } from '$components';
	import type { ScrollDir } from '$lib/types';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';

	let scrollAreaPopular: HTMLElement | undefined;
	let disabledLeft = true;
	let disabledRight = false;

	const scrollFn = (dir: ScrollDir) => {
		if (!scrollAreaPopular) return;
		if (dir === 'next') {
			scrollAreaPopular.scrollLeft += 216;
		} else if (dir === 'prev') {
			scrollAreaPopular.scrollLeft -= 216;
		}
		const scrollableWidth =
			scrollAreaPopular.scrollWidth - scrollAreaPopular.clientWidth;
		disabledLeft = scrollAreaPopular.scrollLeft === 0;
		disabledRight = scrollAreaPopular.scrollLeft >= scrollableWidth;
	};
</script>

<div class="space-y-2">
	<div class="flex items-center justify-between">
		<div class="flex items-baseline gap-2">
			<h2 class="text-2xl font-bold">Popular albums</h2>
			<a
				href="/album/popular"
				class="text-xs font-semibold text-gray-11 hover:underline">Show all</a
			>
		</div>
		<div class="flex gap-2">
			<button
				aria-label="Go left"
				on:click={() => scrollFn('prev')}
				disabled={disabledLeft}
				class="transition-all duration-300 ease-in-out disabled:text-gray-11 disabled:opacity-60"
			>
				<ArrowLeft />
			</button>
			<button
				aria-label="Go right"
				on:click={() => scrollFn('next')}
				disabled={disabledRight}
				class="transition-all duration-300 ease-in-out disabled:text-gray-11 disabled:opacity-60"
			>
				<ArrowRight />
			</button>
		</div>
	</div>
	<div
		class="no-scrollbar flex w-full flex-nowrap gap-2 overflow-x-scroll"
		bind:this={scrollAreaPopular}
	>
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
