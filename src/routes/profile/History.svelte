<script>
	import { page } from '$app/stores';
</script>

<div class="space-y-2">
	{#each $page.data.history as history}
		<div class="group rounded-md p-2 hover:bg-gray-4">
			<p class="text-xl group-hover:text-yellow-12">
				{history.music.name}
			</p>
		</div>
	{/each}
</div>
