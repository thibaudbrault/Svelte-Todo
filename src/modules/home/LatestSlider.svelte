<script lang="ts">
	import { register } from 'swiper/element/bundle';
	import type { SwiperContainer } from 'swiper/element/bundle';
	import type { SwiperOptions } from 'swiper/types';
	import { onMount } from 'svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { Card } from '$components';

	register();

	let swiperEl: SwiperContainer | undefined;
	let swiperNextElem: HTMLElement | undefined;
	let swiperPrevElem: HTMLElement | undefined;

	onMount(() => {
		if (
			swiperEl != undefined &&
			swiperNextElem != undefined &&
			swiperPrevElem != undefined
		) {
			const swiperParams: SwiperOptions = {
				navigation: {
					nextEl: swiperNextElem,
					prevEl: swiperPrevElem,
				},
				slidesPerView: 4,
				slidesPerGroup: 2,
				mousewheel: true,
			};
			Object.assign(swiperEl, swiperParams);
			swiperEl.initialize();
		}
	});
</script>

<div class="space-y-2">
	<div class="flex items-center justify-between">
		<div class="flex items-baseline gap-2">
			<h2 class="text-2xl font-bold">Latest albums</h2>
			<a
				href="/album/latest"
				class="text-xs font-semibold text-gray-11 hover:underline">Show all</a
			>
		</div>
		<div class="flex gap-2">
			<button
				bind:this={swiperPrevElem}
				class="transition-all duration-300 ease-in-out disabled:text-gray-11 disabled:opacity-60"
			>
				<ArrowLeft />
			</button>
			<button
				bind:this={swiperNextElem}
				class="transition-all duration-300 ease-in-out disabled:text-gray-11 disabled:opacity-60"
			>
				<ArrowRight />
			</button>
		</div>
	</div>
	<swiper-container init="false" bind:this={swiperEl}>
		{#each $page.data.latestAlbums as album}
			<swiper-slide>
				<Card
					title={album.name}
					alt={album.name}
					cover={album.cover}
					release={album.release}
					game={album.games.name}
					link={`/album/${album.slug}`}
				/>
			</swiper-slide>
		{/each}
	</swiper-container>
</div>
