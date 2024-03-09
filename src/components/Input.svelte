<script lang="ts">
	export let type: string;
	export let placeholder: string;
	export let name: string;
	export let value;
</script>

<input
	{value}
	{type}
	{placeholder}
	{name}
	min={0}
	class="rounded-md border border-gray-6 bg-grayA-3 p-1 outline-none focus:border-yellow-6"
/>
