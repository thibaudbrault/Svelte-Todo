<script lang="ts">
	import { currentTime, duration, sliderValue } from '$lib/store';
	import { format } from '$lib/utils';
	import { Progress } from 'bits-ui';
</script>

<div class="mx-auto flex w-11/12 max-w-[600px] items-center gap-4">
	<p
		class="w-6 whitespace-nowrap text-center text-sm font-semibold text-gray-11"
	>
		{format($currentTime)}
	</p>
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
	<p
		class="w-6 whitespace-nowrap text-center text-sm font-semibold text-gray-11"
	>
		{format($duration)}
	</p>
</div>
