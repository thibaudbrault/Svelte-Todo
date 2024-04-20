<script lang="ts">
	import { dev } from '$app/environment';
	import {
		audio,
		currentTime,
		duration,
		isLoading,
		isPlayerOpen,
	} from '$lib/store';
	import { nextTrack } from '$lib/utils';
	import { Player } from '$modules';
	import { inject } from '@vercel/analytics';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import Sidebar from './Sidebar.svelte';

	inject({ mode: dev ? 'development' : 'production' });

	let raf: number = 0;
</script>

<Toaster
	richColors
	position="top-center"
	toastOptions={{ style: 'font-weight: 600; font-size: 1.25rem;' }}
/>
<main
	class={`relative flex h-screen flex-col-reverse gap-y-4 bg-gray-1 p-4 text-gray-12 md:flex-row ${$isPlayerOpen ? 'pb-36' : ''}`}
>
	<Sidebar />
	<section
		class="h-full w-full flex-1 overflow-y-auto rounded-md border border-gray-5 bg-gray-2 p-4"
	>
		<slot />
	</section>
	<audio
		src={$audio?.src}
		bind:this={$audio}
		bind:duration={$duration}
		bind:currentTime={$currentTime}
		on:canplay={() => ($isLoading = false)}
		on:ended={nextTrack}
		hidden
	/>
	{#if $audio?.src && $isPlayerOpen}
		<Player {raf} />
	{/if}
</main>
