<script lang="ts">
	import { page } from '$app/stores';

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);
	const month = new Date(now.getFullYear(), now.getMonth(), 1);

	const time = {
		today: [],
		yesterday: [],
		month: [],
		older: [],
	};

	$page.data.history.forEach((history) => {
		if (history.listened_at >= today) {
			time.today.push(history);
		} else if (
			history.listened_at >= yesterday &&
			history.listened_at < today
		) {
			time.yesterday.push(history);
		} else if (history.listened_at >= month) {
			time.month.push(history);
		} else {
			time.older.push(history);
		}
	});

	const partClass = 'font-bold text-2xl text-center flex-shrink mx-4';
</script>

<div class="space-y-2">
	{#if time.today.length > 0}
		<div class="flex items-center justify-center">
			<div class="w-1/4 border-t border-gray-6" />
			<span class={partClass}>Today</span>
			<div class="w-1/4 border-t border-gray-6" />
		</div>
		{#each time.today as history}
			<div class="group rounded-md p-2 hover:bg-gray-4">
				<p class="text-xl group-hover:text-yellow-12">
					{history.music.name}
				</p>
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
			<div class="group rounded-md p-2 hover:bg-gray-4">
				<p class="text-xl group-hover:text-yellow-12">
					{history.music.name}
				</p>
			</div>
		{/each}
	{/if}
	{#if time.month.length > 0}
		<div class="flex items-center justify-center">
			<div class="w-1/4 border-t border-gray-6" />
			<span class={partClass}
				>{month.toLocaleString('en', { month: 'long' })}</span
			>
			<div class="w-1/4 border-t border-gray-6" />
		</div>
		{#each time.month as history}
			<div class="group rounded-md p-2 hover:bg-gray-4">
				<p class="text-xl group-hover:text-yellow-12">
					{history.music.name}
				</p>
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
			<div class="group rounded-md p-2 hover:bg-gray-4">
				<p class="text-xl group-hover:text-yellow-12">
					{history.music.name}
				</p>
			</div>
		{/each}
	{/if}
</div>
