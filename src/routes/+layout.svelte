<script lang="ts">
	import { dev } from '$app/environment';
	import { goto, invalidate } from '$app/navigation';
	import {
		audio,
		authors,
		cover,
		currentTime,
		duration,
		isLoading,
		isPlayerOpen,
		isPlaying,
		isZen,
		title,
	} from '$lib/store';
	import { nextTrack, playPauseTrack, truncate } from '$lib/utils';
	import { Player, PlayerMobile } from '$modules';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import Sidebar from './Sidebar.svelte';
	import { Button } from '$components';
	import { Loader2Icon, Pause, Play } from 'lucide-svelte';

	inject({ mode: dev ? 'development' : 'production' });

	let raf: number = 0;
	let innerWidth = 0;

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		// navigator.serviceWorker.register('/service-worker.ts', {
		// 	type: dev ? 'module' : 'classic',
		// });
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				setTimeout(() => {
					goto('/', { invalidateAll: true });
				});
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Toaster
	richColors
	position="top-center"
	toastOptions={{ style: 'font-weight: 600; font-size: 1.25rem;' }}
/>
<svelte:window bind:innerWidth />
<main
	class={`relative flex h-screen flex-col-reverse gap-y-4 bg-gray-1 p-4 text-gray-12 md:flex-row ${$isPlayerOpen ? 'md:pb-28' : ''}`}
>
	{#if !$isZen}
		<Sidebar />
		<section
			class="h-full w-full flex-1 overflow-y-auto rounded-md border border-gray-5 bg-gray-2 p-4"
		>
			<slot />
		</section>
		<div class="md:hidden">
			<h1 class="text-2xl font-bold">GameMusic</h1>
		</div>
	{:else}
		<div class="flex h-full w-full items-center justify-center">
			<img src={$cover} alt="" class={'size-96 rounded-md shadow-xl'} />
		</div>
	{/if}
	<audio
		src={$audio?.src}
		bind:this={$audio}
		bind:duration={$duration}
		bind:currentTime={$currentTime}
		on:canplay={() => ($isLoading = false)}
		on:ended={() => nextTrack()}
		hidden
	/>
	{#if $audio?.src && $isPlayerOpen}
		{#if innerWidth > 768}
			<Player {raf} />
		{:else}
			<PlayerMobile {raf} />
		{/if}
	{/if}
	{#if !$isPlayerOpen && $audio?.src && innerWidth < 768}
		<section
			role="button"
			tabindex="-1"
			on:keypress={(event) => event.key === 'Enter' && ($isPlayerOpen = true)}
			on:click={() => {
				$isPlayerOpen = true;
			}}
			class="fixed bottom-20 left-1 right-1 flex items-center justify-between rounded-md border border-yellow-6 bg-gray-1 px-6 py-2"
		>
			<div class="flex items-center gap-2">
				<img src={$cover} alt="" class="mx-auto max-w-12 rounded-md" />
				<div class="flex flex-col justify-start gap-1">
					<p>
						{truncate($title, 15)}
					</p>
					<div class="flex items-center gap-1">
						{#each $authors as authors}
							<p class="text-xs">{authors.author.name}</p>
						{/each}
					</div>
				</div>
			</div>
			<Button
				aria-label={$isPlaying ? 'Pause' : 'Play'}
				intent="primary"
				rounded="full"
				size="icon"
				on:click={(event) => {
					event.stopPropagation();
					playPauseTrack(raf);
				}}
				disabled={$isLoading}
			>
				{#if $isLoading}
					<Loader2Icon class="size-5 animate-spin" />
				{:else if $isPlaying}
					<Pause class="size-5" />
				{:else}
					<Play class="size-5" />
				{/if}
			</Button>
		</section>
	{/if}
</main>
