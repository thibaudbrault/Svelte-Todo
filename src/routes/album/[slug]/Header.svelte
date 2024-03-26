<script lang="ts">
	import { page } from '$app/stores';
	import { isPlaying } from '$lib/store.js';

	export let cover: string;
	export let name: string;
</script>

<div class="flex gap-4 p-4">
	<div class="relative h-56 w-56 rounded-full border border-gray-5">
		<img
			src={cover}
			alt={name}
			class={`h-full w-full rounded-full ${$isPlaying ? 'animate-spin-slow' : ''}`}
		/>
		<div class="absolute inset-0 rounded-full bg-gray-1 opacity-15" />
	</div>

	<div class="flex flex-1 flex-col justify-end gap-4">
		<small class="text-xs font-semibold capitalize text-yellowA-11"
			>{$page.data.game}</small
		>
		<h1 class="text-6xl font-bold">{name}</h1>
		<ul class="flex">
			<li>150 likes</li>
			<li class="before:mx-2 before:content-['·']">
				{$page.data.length} titles
			</li>
		</ul>
	</div>
</div>
