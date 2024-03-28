<script lang="ts">
	import { currentTime, duration, sliderValue } from '$lib/store';
	import { format } from '$lib/utils';
	import { Progress } from 'bits-ui';
</script>

<div class="flex w-full max-w-[600px] items-center gap-4">
	<Progress.Root
		max={$duration}
		bind:value={$sliderValue}
		class="relative h-1 w-full overflow-hidden rounded-full bg-gray-11"
	>
		<div
			class="h-full w-full flex-1 rounded-full bg-gray-12"
			style={`transform: translateX(-${
				100 - 100 * ($currentTime / $duration)
			}%)`}
		/>
	</Progress.Root>
	<p class="whitespace-nowrap text-xs font-semibold text-gray-11">
		{format($currentTime)} / {format($duration)}
	</p>
</div>
