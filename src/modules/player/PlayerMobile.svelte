<script lang="ts">
	import { Button } from '$components';
	import {
		cover,
		isLoading,
		isLooped,
		isPlayerOpen,
		isPlaying,
		isShuffled,
		title,
	} from '$lib/store';
	import { nextTrack, playPauseTrack, prevTrack } from '$lib/utils';
	import {
		Heart,
		ListPlus,
		Loader2Icon,
		Pause,
		Play,
		Repeat,
		Shuffle,
		SkipBack,
		SkipForward,
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { Drawer } from 'vaul-svelte';
	import Progress from './Progress.svelte';

	export let raf: number;

	const handleLoop = () => {
		$isLooped = !$isLooped;
		$isShuffled = false;
	};

	const handleShuffle = () => {
		$isShuffled = !$isShuffled;
		$isLooped = false;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			playPauseTrack(raf);
		}
	};

	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<Drawer.Root bind:open={$isPlayerOpen}>
	<Drawer.Portal class="z-20 block md:hidden">
		<Drawer.Overlay class="fixed inset-0 bg-black/40" />
		<Drawer.Content
			class="fixed bottom-0 left-0 right-0 z-20 flex flex-col rounded-t-md border-t border-t-yellow-6 bg-gray-1"
		>
			<div class="flex flex-col items-center justify-center gap-8 px-2 py-8">
				<div
					class="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-9"
				/>
				<div class="flex flex-col items-center gap-2">
					<img
						src={$cover}
						alt=""
						class="mx-auto max-w-56 rounded-md border border-yellow-6"
					/>
					<p class="text-center text-2xl font-semibold text-gray-12">
						{$title}
					</p>
				</div>
				<div class="flex items-center gap-4">
					<Button
						aria-label="Previous track"
						intent="ghost"
						size="icon"
						on:click={() => prevTrack()}
					>
						<SkipBack />
					</Button>
					<Button
						aria-label={$isPlaying ? 'Pause' : 'Play'}
						intent="primary"
						rounded="full"
						size="icon"
						on:click={() => playPauseTrack(raf)}
						disabled={$isLoading}
					>
						{#if $isLoading}
							<Loader2Icon class="h-8 w-8 animate-spin" />
						{:else if $isPlaying}
							<Pause class="h-8 w-8" />
						{:else}
							<Play class="h-8 w-8" />
						{/if}
					</Button>
					<Button
						aria-label="Next track"
						intent="ghost"
						size="icon"
						on:click={() => nextTrack()}
					>
						<SkipForward />
					</Button>
				</div>
				<Progress />
				<div class="flex items-center gap-4">
					<Button aria-label="Add to favorite" intent="ghost" size="icon">
						<Heart class="h-4 w-4" />
					</Button>
					<Button
						aria-label="Shuffle"
						intent="ghost"
						size="icon"
						on:click={handleShuffle}
					>
						<Shuffle class={`h-4 w-4 ${$isShuffled ? 'text-yellow-11' : ''}`} />
					</Button>
					<Button
						aria-label="Loop"
						intent="ghost"
						size="icon"
						on:click={handleLoop}
					>
						<Repeat class={`h-4 w-4 ${$isLooped ? 'text-yellow-11' : ''}`} />
					</Button>
					<div
						class="flex w-fit cursor-pointer items-center justify-center p-2"
					>
						<ListPlus class="h-4 w-4" />
					</div>
				</div>
			</div>
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
