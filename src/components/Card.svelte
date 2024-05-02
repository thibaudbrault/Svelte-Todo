<script lang="ts">
	export let title: string;
	export let alt: string;
	export let cover: string;
	export let link: string;
	export let release: number;
	export let game: string;
</script>

<div
	class="flex w-52 flex-col justify-center rounded-md p-4 transition-all duration-300 ease-in-out hover:bg-gray-3"
>
	<img {alt} src={cover} class="size-44 rounded-md" />
	<h3 class="truncate font-semibold">
		<a class="hover:text-yellow-12" href={link}>{title}</a>
	</h3>
	<div class="space-x-1">
		<small class="text-xs text-gray-11">{release}</small>
		<span class="font-bold text-gray-11">·</span>
		<small class="text-xs text-gray-11">{game}</small>
	</div>
</div>
