<script lang="ts">
	import { page } from '$app/stores';
	import { LatestSlider, PopularSlider } from '$modules';
	import { AudioLines, Heart, ListMusic } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { SwiperContainer } from 'swiper/element/bundle';
	import { register } from 'swiper/element/bundle';
	import type { SwiperOptions } from 'swiper/types';

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

{#if $page.data.album.length > 0}
	<div class="flex flex-col gap-8">
		<div class="flex w-full flex-col items-center gap-8 md:flex-row">
			<div class="w-full space-y-2 md:w-auto">
				<h2 class="text-2xl font-bold text-yellow-12">Random album</h2>
				<div
					class="relative flex w-full flex-col items-center justify-center rounded-md border border-yellowA-6 bg-yellow-surface py-8 transition-all duration-300 ease-in-out md:w-72"
				>
					<img
						src={$page.data.album[0].cover}
						alt={$page.data.album[0].name}
						class="z-10 size-44 rounded-md"
					/>
					<h3 class="z-10 truncate font-semibold">
						<a href={`/album/${$page.data.album[0].slug}`}
							>{$page.data.album[0].name}</a
						>
					</h3>
					<AudioLines
						class="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 transform opacity-20"
					/>
				</div>
			</div>
			{#if $page.data.user}
				<div class="w-full space-y-2 md:min-w-72">
					<h2
						class="font-semibold lowercase text-gray-11"
						style="font-variant: small-caps;"
					>
						{$page.data.profile.name}'s statistics
					</h2>
					<ul class="flex w-full flex-col gap-2">
						<li
							class="flex items-center justify-between rounded-md bg-gray-3 px-4 py-2"
						>
							<div>
								<p
									class="text-sm lowercase text-gray-11"
									style="font-variant: small-caps;"
								>
									Likes
								</p>
								<p class="text-2xl font-bold">
									{$page.data.favoritesMusics.length}
								</p>
							</div>
							<Heart class="text-yellow-12" />
						</li>
						<li
							class="flex items-center justify-between rounded-md bg-gray-3 px-4 py-2"
						>
							<div>
								<p
									class="text-sm lowercase text-gray-11"
									style="font-variant: small-caps;"
								>
									Playlists
								</p>
								<p class="text-2xl font-bold">{$page.data.playlists.length}</p>
							</div>
							<ListMusic class="text-yellow-12" />
						</li>
					</ul>
				</div>
			{/if}
		</div>
		<div class="space-y-2">
			<div class="flex items-baseline gap-2">
				<h2 class="text-2xl font-bold">Games</h2>
			</div>
			<div class="grid auto-cols-max grid-flow-col gap-2 overflow-x-hidden">
				{#each $page.data.games as game}
					<div
						class="flex size-48 items-center justify-center rounded-md bg-gray-3 p-4 text-center"
					>
						<a
							href={`/game/${game.value}`}
							class="text-3xl font-semibold hover:text-yellow-12">{game.name}</a
						>
					</div>
				{/each}
			</div>
		</div>
		<LatestSlider />
		<PopularSlider />
	</div>
{:else}
	<p
		class="flex h-full items-center justify-center text-center text-4xl font-semibold capitalize"
	>
		No album <br />Come back later
	</p>
{/if}
