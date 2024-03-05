<script lang="ts">
	import { currentTime, duration, sliderValue } from '$lib/store';
	import { format } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const updatePosition = () => {
		dispatch('change');
	};
</script>

<div class="flex w-full items-center gap-4">
	<p>{format($currentTime)}</p>
	<input
		type="range"
		min={0}
		max={$duration}
		step={0.01}
		bind:value={$sliderValue}
		on:input={updatePosition}
		class="h-2 w-full flex-1 cursor-pointer appearance-none rounded-lg bg-gray-12"
	/>
	<p>{format($duration)}</p>
</div>
