<script lang="ts">
	import type { SelectMusic } from '$lib/db';
	import { trackId } from '$lib/store';
	import { format } from '$lib/utils';
	import { Clock } from 'lucide-svelte';

	export let musics: SelectMusic[];
	export let selectedTrack: number | null;
	export let loadTrack: () => void;

	$: {
		selectedTrack = $trackId;
	}
</script>

<div class="w-full space-y-2 p-4">
	<div
		class="grid grid-cols-[30px_3fr_2fr_60px] border-b border-b-yellowA-6 pb-2 font-normal text-gray-11"
	>
		<p>#</p>
		<p>Title</p>
		<p>Author</p>
		<p><Clock /></p>
	</div>
	<ol class="space-y-2">
		{#each musics as music, index}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				on:click={() => {
					$trackId = index;
					loadTrack();
				}}
				class={`grid cursor-pointer grid-cols-[30px_3fr_2fr_60px] items-center rounded-md p-2  ${selectedTrack === index ? 'bg-gray-12 text-gray-1' : 'hover:bg-grayA-5'}`}
			>
				<p
					class={`text-sm ${selectedTrack === index ? 'text-gray-2' : 'text-gray-11'}`}
				>
					{music.id}
				</p>
				<p class="text-2xl">{music.title}</p>
				<p class="capitalize">the author</p>
				<p>{format(music.duration)}</p>
			</li>
		{/each}
	</ol>
</div>
