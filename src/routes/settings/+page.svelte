<script lang="ts">
	import { page } from '$app/stores';
	import { Separator } from 'bits-ui';

	let editingIndex: number | null = null;

	const editText = (index: number) => {
		editingIndex = index;
	};

	const handleBlur = (event: Event) => {
		const input = event.target as HTMLInputElement;
		console.log(input.value);
		editingIndex = null;
	};
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl font-bold md:text-5xl lg:text-6xl">Settings</h1>
	<Separator.Root class="mx-auto h-px w-11/12 bg-gray-5" />
	<div class="flex flex-col items-start gap-2">
		<h2 class="text-2xl font-semibold">Games</h2>
		{#each $page.data.games as game, index}
			<button on:click={() => editText(index)}>
				{#if editingIndex === index}
					<input type="text" value={game.name} on:blur={handleBlur} />
				{:else}
					<p>{game.name}</p>
				{/if}
			</button>
		{/each}
	</div>
</div>
