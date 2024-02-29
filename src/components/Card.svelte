<script lang="ts">
	export let title: string;
	export let desc: string;
	export let alt: string;
	export let cover: string;
</script>

<div class="rounded-md bg-neutral-600/50 p-4">
	<img {alt} src={cover} class="rounded-md" />
	<h3 class="text-center font-semibold">{title}</h3>
	<p>{desc}</p>
</div>
