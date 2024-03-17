<script lang="ts">
	export let cover: string;
	export let name: string;
	export let category: string;
	export let length: number;
</script>

<div class="flex gap-4 p-4">
	<div class="relative h-56 w-56 rounded-md border border-gray-5">
		<img src={cover} alt={name} class="h-full w-full rounded-md" />
		<div class="absolute inset-0 rounded-md bg-gray-1 opacity-15" />
	</div>

	<div class="flex flex-1 flex-col justify-end gap-4">
		<small class="text-xs font-semibold capitalize text-yellowA-11"
			>{category}</small
		>
		<h1 class="text-6xl font-bold">{name}</h1>
		<div>
			<p class="text-xs text-gray-11">Remake of the 2G</p>
			<ul class="flex">
				<li>150 likes</li>
				<li class="before:mx-2 before:content-['·']">
					{length} titles
				</li>
			</ul>
		</div>
	</div>
</div>
