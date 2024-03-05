<script lang="ts">
	export let title: string;
	export let alt: string;
	export let cover: string;
	export let link: string;
</script>

<div class="rounded-md bg-neutral-600/50 p-4">
	<img {alt} src={cover} class="rounded-md" />
	<h3 class="text-center font-semibold"><a href={link}>{title}</a></h3>
</div>
