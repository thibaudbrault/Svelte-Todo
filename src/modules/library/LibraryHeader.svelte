<script lang="ts">
	export let cover: string;
	export let albumTitle: string;
	export let albumLength: number;
</script>

<div class="flex gap-4 p-4">
	<div class="border-gray-5 relative h-56 w-56 rounded-md border">
		<img src={cover} alt={albumTitle} class="h-full w-full rounded-md" />
		<div class="bg-gray-1 absolute inset-0 rounded-md opacity-15" />
	</div>

	<div class="flex flex-1 flex-col justify-end gap-4">
		<small class="text-yellowA-11 text-xs font-semibold">Album</small>
		<h1 class="text-6xl font-bold">{albumTitle}</h1>
		<div>
			<p class="text-gray-11 text-xs">Pokémon remake of the 2G</p>
			<ul class="flex">
				<li>150 likes</li>
				<li class="before:mx-2 before:content-['·']">
					{albumLength} titles
				</li>
			</ul>
		</div>
	</div>
</div>
