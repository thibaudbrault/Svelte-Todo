<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<slot name="trigger" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content
		class="flex flex-col gap-2 rounded-md border border-gray-5 bg-gray-3 px-4 py-2"
	>
		<slot name="content" />
	</DropdownMenu.Content>
</DropdownMenu.Root>
