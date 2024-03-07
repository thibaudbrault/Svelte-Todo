<script lang="ts">
	export let title: string;
	export let alt: string;
	export let cover: string;
	export let link: string;
</script>

<div
	class="flex flex-col justify-center gap-2 rounded-md border border-gray-5 bg-gray-3 p-4 transition-all duration-300 ease-in-out hover:bg-gray-4"
>
	<img {alt} src={cover} class="h-40 w-40 rounded-md" />
	<h3 class="text-sm font-semibold"><a href={link}>{title}</a></h3>
</div>
