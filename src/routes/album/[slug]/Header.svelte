<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$components';
	import { isPlaying } from '$lib/store.js';
	import { Heart } from 'lucide-svelte';

	export let cover: string;
	export let name: string;
	export let release: number;
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
		<div class="flex text-sm font-semibold capitalize text-yellowA-11">
			<small>
				{$page.data.game}
			</small>
			<small class="before:mx-2 before:font-bold before:content-['·']">
				{release}
			</small>
		</div>
		<h1 class="text-6xl font-bold">{name}</h1>
		<div class="flex items-center justify-between">
			<ul class="flex">
				<li>{$page.data.likes} likes</li>
				<li class="before:mx-2 before:font-bold before:content-['·']">
					{$page.data.length} titles
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
