<script lang="ts">
	import { Tooltip } from 'bits-ui';
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<slot name="trigger" />
	</Tooltip.Trigger>
	<Tooltip.Content class="rounded-md border border-gray-6 bg-gray-1 px-2 py-1">
		<slot name="content" />
		<Tooltip.Arrow class="border-l border-t border-l-gray-6 border-t-gray-6" />
	</Tooltip.Content>
</Tooltip.Root>
