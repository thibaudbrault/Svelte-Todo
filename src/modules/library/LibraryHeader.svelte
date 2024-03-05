<script lang="ts">
	export let cover: string;
	export let albumTitle: string;
	export let albumLength: number;
</script>

<div class="flex gap-4 p-4">
	<img
		src={cover}
		alt={albumTitle}
		class="h-56 w-56 rounded-md border border-gray-5"
	/>
	<div class="flex flex-1 flex-col justify-end gap-4">
		<small class="text-xs font-semibold text-yellowA-11">Album</small>
		<h1 class="text-6xl font-bold">{albumTitle}</h1>
		<div>
			<p class="text-xs text-gray-11">Pokémon remake of the 2G</p>
			<ul class="flex">
				<li>150 likes</li>
				<li class="before:mx-2 before:content-['·']">
					{albumLength} titles
				</li>
			</ul>
		</div>
	</div>
</div>
