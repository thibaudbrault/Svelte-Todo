<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$components';
	import { CheckSquare, Trash2, X } from 'lucide-svelte';

	type CheckboxState = {
		[key: string]: boolean;
	};

	const now = new Date();
	const yesterday = new Date(now);
	yesterday.setDate(now.getDate() - 1);
	const beforeYesterday = new Date(now);
	beforeYesterday.setDate(now.getDate() - 2);
	const month = new Date(now.getFullYear(), now.getMonth(), 1);

	let time = {
		today: [],
		yesterday: [],
		month: [],
		older: [],
	};

	$: {
		time = {
			today: [],
			yesterday: [],
			month: [],
			older: [],
		};

		const now = new Date();
		// Define yesterday, beforeYesterday, month boundaries based on your logic

		$page.data.history.forEach((history) => {
			const listenedAt = new Date(history.listenedAt);
			if (listenedAt <= now && listenedAt > yesterday) {
				time.today.push(history);
			} else if (listenedAt <= yesterday && listenedAt > beforeYesterday) {
				time.yesterday.push(history);
			} else if (listenedAt >= month) {
				time.month.push(history);
			} else {
				time.older.push(history);
			}
		});
	}

	const partClass = 'font-bold text-2xl text-center flex-shrink mx-4';
	const nameClass = 'text-xl font-semibold group-hover:text-yellow-12';
	const albumNameClass = 'text-gray-11 text-xs';

	let selectedValues: string[] = [];
	let checkboxState: CheckboxState = {};
	let allSelected = false;
	const handleChange = (musicId: string, event: Event) => {
		const target = event.target as HTMLInputElement;
		checkboxState[musicId] = target.checked;
		if (target.checked) {
			selectedValues = [...selectedValues, musicId];
		} else {
			selectedValues = selectedValues.filter((value) => value !== musicId);
		}
	};

	const toggleAll = () => {
		if (selectedValues.length === $page.data.history.length) {
			uncheckAll();
		} else {
			allSelected = true;
			selectedValues = time.today.map((history) => {
				checkboxState[history.musicId] = true;
				return history.musicId;
			});
		}
	};

	const uncheckAll = () => {
		for (let musicId in checkboxState) {
			checkboxState[musicId] = false;
		}
		selectedValues = [];
		allSelected = false;
	};
</script>

{#if $page.data.history.length > 0}
	<div class="mb-4 flex items-center gap-6">
		<div>
			<Button
				intent="secondary"
				size="icon"
				weight="semibold"
				class="gap-1"
				on:click={toggleAll}
			>
				{#if selectedValues.length === $page.data.history.length}
					<X />
					<span>Unselect all</span>
				{:else}
					<CheckSquare />
					<span>Select all</span>
				{/if}
			</Button>
		</div>
		{#if selectedValues.length > 0}
			<div class="flex items-center gap-1">
				<Button
					intent="secondary"
					size="icon"
					weight="semibold"
					class="gap-1"
					on:click={uncheckAll}
				>
					<X />
					<span
						>Selected {selectedValues.length}
						{selectedValues.length === 1 ? 'track' : 'tracks'}</span
					>
				</Button>
			</div>
			<div>
				<form method="POST" use:enhance action="?/deleteHistory">
					<input
						type="text"
						value={$page.data.profile.id}
						name="userId"
						hidden
					/>
					<input type="text" value={allSelected} name="allSelected" hidden />
					<input value={JSON.stringify(selectedValues)} name="values" hidden />
					<Button
						intent="destructive"
						size="icon"
						weight="semibold"
						class="gap-1"
					>
						<Trash2 />
						Delete {selectedValues.length}
						{selectedValues.length === 1 ? 'track' : 'tracks'}
					</Button>
				</form>
			</div>
		{/if}
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
					<input
						type="checkbox"
						value={history.musicId}
						bind:checked={checkboxState[history.musicId]}
						on:change={(event) => handleChange(history.musicId, event)}
					/>
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
