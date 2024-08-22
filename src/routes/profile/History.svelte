<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$components';
	import { Trash2 } from 'lucide-svelte';

	const now = new Date();
	const yesterday = new Date(now);
	yesterday.setDate(now.getDate() - 1);
	const beforeYesterday = new Date(now);
	beforeYesterday.setDate(now.getDate() - 2);
	const month = new Date(now.getFullYear(), now.getMonth(), 1);

	const time = {
		today: [],
		yesterday: [],
		month: [],
		older: [],
	};

	$page.data.history.forEach((history) => {
		if (history.listenedAt <= now && history.listenedAt > yesterday) {
			time.today.push(history);
		} else if (
			history.listenedAt <= yesterday &&
			history.listenedAt > beforeYesterday
		) {
			time.yesterday.push(history);
		} else if (history.listenedAt >= month) {
			time.month.push(history);
		} else {
			time.older.push(history);
		}
	});

	const partClass = 'font-bold text-2xl text-center flex-shrink mx-4';
	const nameClass = 'text-xl font-semibold group-hover:text-yellow-12';
	const albumNameClass = 'text-gray-11 text-xs';
</script>

{#if $page.data.history.length > 0}
	<div class="flex w-full justify-end">
		<form method="POST" use:enhance action="?/deleteAllHistory">
			<input type="text" value={$page.data.profile.id} name="userId" hidden />
			<Button intent="destructive" size="icon">
				<Trash2 />
			</Button>
		</form>
	</div>
	<div class="space-y-2">
		{#if time.today.length > 0}
			<div class="flex items-center justify-center">
				<div class="w-1/4 border-t border-gray-6" />
				<span class={partClass}>Today</span>
				<div class="w-1/4 border-t border-gray-6" />
			</div>
			{#each time.today as history}
				<div
					class="group flex items-baseline gap-2 rounded-md p-2 hover:bg-gray-4"
				>
					<a href={`/album/${history.music.album.slug}`} class={nameClass}>
						{history.music.name}
					</a>
					<small class={albumNameClass}>{history.music.album.name}</small>
				</div>
			{/each}
		{/if}
		{#if time.yesterday.length > 0}
			<div class="flex items-center justify-center">
				<div class="w-1/4 border-t border-gray-6" />
				<span class={partClass}>Yesterday</span>
				<div class="w-1/4 border-t border-gray-6" />
			</div>
			{#each time.yesterday as history}
				<div
					class="group flex items-baseline gap-2 rounded-md p-2 hover:bg-gray-4"
				>
					<a href={`/album/${history.music.album.slug}`} class={nameClass}>
						{history.music.name}
					</a>
					<small class={albumNameClass}>{history.music.album.name}</small>
				</div>
			{/each}
		{/if}
		{#if time.month.length > 0}
			<div class="flex items-center justify-center">
				<div class="w-1/4 border-t border-gray-6" />
				<span class={partClass}>
					{month.toLocaleString('en', { month: 'long' })}
				</span>
				<div class="w-1/4 border-t border-gray-6" />
			</div>
			{#each time.month as history}
				<div
					class="group flex items-baseline gap-2 rounded-md p-2 hover:bg-gray-4"
				>
					<a href={`/album/${history.music.album.slug}`} class={nameClass}>
						{history.music.name}
					</a>
					<small class={albumNameClass}>{history.music.album.name}</small>
				</div>
			{/each}
		{/if}
		{#if time.older.length > 0}
			<div class="flex items-center justify-center">
				<div class="w-1/4 border-t border-gray-6" />
				<span class={partClass}>Older</span>
				<div class="w-1/4 border-t border-gray-6" />
			</div>
			{#each time.older as history}
				<div
					class="group flex items-baseline gap-2 rounded-md p-2 hover:bg-gray-4"
				>
					<a href={`/album/${history.music.album.slug}`} class={nameClass}>
						{history.music.name}
					</a>
					<small class={albumNameClass}>{history.music.album.name}</small>
				</div>
			{/each}
		{/if}
	</div>
{:else}
	<p class="flex items-center justify-center text-4xl font-semibold capitalize">
		No history
	</p>
{/if}
