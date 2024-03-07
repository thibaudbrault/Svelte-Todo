<script lang="ts">
	import { Button, Dialog, Input, Label, Switch } from '$components';
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

	let checked: boolean = false;
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
	{#if musics.length > 0}
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
					<p class="text-xl font-bold">{music.title}</p>
					<p class="capitalize">the author</p>
					<p>{format(music.duration)}</p>
				</li>
			{/each}
		</ol>
	{:else}
		<p class="col-span-5 py-4 text-center text-xl font-bold capitalize">
			No music
		</p>
	{/if}
	<Dialog title="New music" trigger="Add music">
		<form
			slot="content"
			action="?/createMusic"
			method="POST"
			enctype="multipart/form-data"
			class="w-full space-y-4"
		>
			<fieldset class="flex w-full flex-col gap-2">
				<div class="flex flex-col gap-1">
					<Label field="title">Title</Label>
					<Input type="text" placeholder="Title" name="title" />
				</div>
				{#if !checked}
					<div class="flex flex-col gap-1">
						<Label field="number">Number</Label>
						<Input type="number" placeholder="Number" name="number" />
					</div>
					<div class="flex flex-col gap-1">
						<Label field="duration">Duration (in seconds)</Label>
						<Input type="number" placeholder="Duration" name="duration" />
					</div>
				{/if}
				<div class="flex items-center justify-between gap-2">
					<div class="flex flex-col gap-1">
						<Label field="track"
							>Track {checked ? '(multiple)' : '(single)'}</Label
						>
						<input
							type="file"
							placeholder="Track"
							name="track"
							multiple={checked}
						/>
					</div>
					<Switch bind:checked />
				</div>
			</fieldset>
			<Button
				intent="primary"
				size="small"
				width="full"
				class="font-semibold lowercase"
				style="font-variant: small-caps;">Add</Button
			>
		</form>
	</Dialog>
</div>
