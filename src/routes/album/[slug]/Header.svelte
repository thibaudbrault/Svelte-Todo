<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button, Dropdown } from '$components';
	import type { SelectMusic } from '$lib/db';
	import { isPlaying } from '$lib/store.js';
	import { AddMusic, DeleteMusics } from '$modules';
	import { Heart, MoreHorizontal } from 'lucide-svelte';

	export let cover: string;
	export let name: string;
	export let release: number;
	export let albumId: string;

	const calculateTotalDuration = (musics: SelectMusic[]) => {
		let totalDurationSeconds = 0;
		for (let track of musics) {
			totalDurationSeconds += track.duration;
		}
		return totalDurationSeconds;
	};

	const formatTotalDuration = (totalSeconds: number) => {
		const totalHours = Math.floor(totalSeconds / 3600);
		const remainingSeconds = totalSeconds % 3600;
		const totalMinutes = Math.floor(remainingSeconds / 60);
		if (totalHours === 0) {
			return `${totalMinutes} minutes`;
		} else {
			return `${totalHours}h ${totalMinutes}`;
		}
	};
</script>

<div class="flex flex-col items-center gap-4 p-4 sm:flex-row">
	<div
		class="relative max-w-52 rounded-full border border-gray-5 sm:h-28 sm:w-28 md:h-40 md:w-40 lg:h-52 lg:w-52"
	>
		<img
			src={cover}
			alt={name}
			class={`h-full w-full rounded-full ${$isPlaying ? 'animate-spin-slow' : ''}`}
		/>
		<div class="absolute inset-0 rounded-full bg-gray-1 opacity-15" />
	</div>
	<div class="flex flex-1 flex-col justify-end gap-4">
		<div
			class="flex justify-center text-sm font-semibold capitalize text-yellowA-11 sm:justify-start"
		>
			<small>
				{$page.data.game}
			</small>
			<small class="before:mx-2 before:font-bold before:content-['·']">
				{release}
			</small>
		</div>
		<h1
			class="text-center text-4xl font-bold sm:text-left md:text-5xl lg:text-6xl"
		>
			{name}
		</h1>
		<div class="flex items-center justify-between">
			<ul class="flex gap-2 text-gray-11 sm:gap-0">
				<li>{$page.data.likes} likes</li>
				<li class="sm:before:mx-2 sm:before:font-bold sm:before:content-['·']">
					{$page.data.length} titles
				</li>
				<li class="sm:before:mx-2 sm:before:font-bold sm:before:content-['·']">
					{formatTotalDuration(calculateTotalDuration($page.data.musics))}
				</li>
			</ul>
			<div class="flex gap-1">
				{#if $page.data.session}
					{#if $page.data.favoritesAlbums.some((fav) => fav.id === albumId)}
						<form method="POST" use:enhance action="?/removeFavoriteAlbum">
							<input value={$page.data.album.id} name="albumId" hidden />
							<input value={$page.data.user.id} name="userId" hidden />
							<Button intent="ghost" size="icon" class="text-red-400">
								<Heart class="fill-red-400" />
							</Button>
						</form>
					{:else}
						<form method="POST" use:enhance action="?/addFavoriteAlbum">
							<input value={$page.data.album.id} name="albumId" hidden />
							<input value={$page.data.user.id} name="userId" hidden />
							<Button intent="ghost" size="icon">
								<Heart />
							</Button>
						</form>
					{/if}
				{/if}
				{#if $page.data.user && $page.data.user.role === 'admin'}
					<Dropdown>
						<MoreHorizontal slot="trigger" />
						<svelte:fragment slot="content">
							<AddMusic />
							<DeleteMusics />
						</svelte:fragment>
					</Dropdown>
				{/if}
			</div>
		</div>
	</div>
</div>
