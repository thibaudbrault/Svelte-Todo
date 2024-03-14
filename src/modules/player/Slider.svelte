<script lang="ts">
	import { currentTime, duration, sliderValue } from '$lib/store';
	import { format } from '$lib/utils';
	import { Progress } from 'bits-ui';
</script>

<div class="flex w-full max-w-[600px] items-center gap-4">
	<Progress.Root
		max={$duration}
		bind:value={$sliderValue}
		class="bg-gray-11 relative h-1 w-full overflow-hidden rounded-full"
	>
		<div
			class="bg-gray-12 h-full w-full flex-1 rounded-full"
			style={`transform: translateX(-${
				100 - 100 * ($currentTime / $duration)
			}%)`}
		/>
	</Progress.Root>
	<p class="text-gray-11 whitespace-nowrap text-xs font-semibold">
		{format($currentTime)} / {format($duration)}
	</p>
</div>
