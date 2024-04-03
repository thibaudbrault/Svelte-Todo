<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$components';
	import type { SelectMusic } from '$lib/db';
	import { isPlaying } from '$lib/store.js';
	import { AddMusic } from '$modules';
	import { Heart } from 'lucide-svelte';

	export let cover: string;
	export let name: string;
	export let release: number;

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

		return `${totalHours}h ${totalMinutes}`;
	};
</script>

<div class="flex gap-4 p-4">
	<div
		class="relative hidden rounded-full border border-gray-5 sm:block sm:h-28 sm:w-28 md:h-52 md:w-52"
	>
		<img
			src={cover}
			alt={name}
			class={`h-full w-full rounded-full ${$isPlaying ? 'animate-spin-slow' : ''}`}
		/>
		<div class="absolute inset-0 rounded-full bg-gray-1 opacity-15" />
	</div>

	<div class="flex flex-1 flex-col justify-end gap-4">
		<div class="flex text-sm font-semibold capitalize text-yellowA-11">
			<small>
				{$page.data.game}
			</small>
			<small class="before:mx-2 before:font-bold before:content-['·']">
				{release}
			</small>
		</div>
		<div class="flex items-baseline gap-4">
			<h1 class="text-2xl font-bold sm:text-4xl md:text-6xl">{name}</h1>
			{#if $page.data.user && $page.data.user.role === 'admin'}
				<AddMusic />
			{/if}
		</div>
		<div class="flex items-center justify-between">
			<ul class="flex text-gray-11">
				<li>{$page.data.likes} likes</li>
				<li class="before:mx-2 before:font-bold before:content-['·']">
					{$page.data.length} titles
				</li>
				<li class="before:mx-2 before:font-bold before:content-['·']">
					{formatTotalDuration(calculateTotalDuration($page.data.musics))}
				</li>
			</ul>
			{#if $page.data.session}
				<form method="POST" use:enhance action="?/addFavoriteAlbum">
					<input value={$page.data.album.id} name="albumId" hidden />
					<input value={$page.data.user.id} name="userId" hidden />
					<Button intent="ghost" size="icon">
						<Heart />
					</Button>
				</form>
			{/if}
		</div>
	</div>
</div>
