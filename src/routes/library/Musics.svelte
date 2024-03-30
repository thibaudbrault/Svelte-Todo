<script>
	import { page } from '$app/stores';
</script>

<section>
	{#if $page.data.favoritesMusics.length > 0}
		<ul>
			{#each $page.data.favoritesMusics as allMusics (allMusics.musics.id)}
				<li>{allMusics.musics.name}</li>
			{/each}
		</ul>
	{:else}
		<p class="col-span-5 py-4 text-center text-xl font-bold capitalize">
			No music
		</p>
	{/if}
</section>
