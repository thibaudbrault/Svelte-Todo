<script lang="ts">
	import { Switch } from 'bits-ui';

	export let checked: boolean;
</script>

<Switch.Root
	bind:checked
	class="focus-visible:ring-foreground focus-visible:ring-offset-background inline-flex h-[20px] min-h-[20px] w-[40px] shrink-0 cursor-pointer items-center rounded-full border border-gray-6 px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=checked]:bg-yellow-5 data-[state=unchecked]:bg-gray-3"
>
	<Switch.Thumb
		class="pointer-events-none block size-[14px] shrink-0 rounded-full bg-gray-12 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
	/>
</Switch.Root>
