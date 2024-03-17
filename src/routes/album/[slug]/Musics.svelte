<script lang="ts">
	import {
		Button,
		Dialog,
		FileInput,
		Form,
		NumberInput,
		ScrollArea,
		TextInput,
	} from '$components';
	import type { SelectMusic } from '$lib/db';
	import { trackId } from '$lib/store';
	import { format } from '$lib/utils';
	import {
		createMultipleMusicSchema,
		createSingleMusicSchema,
	} from '$lib/validation';
	import { Dialog as BitsDialog, Tabs } from 'bits-ui';
	import { Clock } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let musics: SelectMusic[];
	export let selectedTrack: number | null;
	export let loadTrack: () => void;
	export let data: PageData;

	$: {
		selectedTrack = $trackId;
	}

	const acceptedExtensions = '.flac, .mp3';
</script>

<div class="w-full space-y-2 p-4">
	<div
		class="grid grid-cols-[30px_3fr_2fr_60px] border-b border-b-yellowA-6 pb-2 pr-4 font-normal text-gray-11"
	>
		<p>#</p>
		<p>Title</p>
		<p>Author</p>
		<p><Clock /></p>
	</div>
	{#if musics.length > 0}
		<div class="h-96">
			<ScrollArea>
				<ol class="space-y-2 pr-4">
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
								{music.number}
							</p>
							<p class="text-xl font-bold">{music.title}</p>
							<p class="capitalize">the author</p>
							<p>{format(music.duration)}</p>
						</li>
					{/each}
				</ol>
			</ScrollArea>
		</div>
	{:else}
		<p class="col-span-5 py-4 text-center text-xl font-bold capitalize">
			No music
		</p>
	{/if}
	<Dialog title="New music" trigger="Add music">
		<BitsDialog.Trigger
			slot="trigger"
			class="!mb-16 w-full rounded-md bg-transparent px-4 py-2 text-gray-12 shadow-sm shadow-grayA-7"
		>
			<span class="font-semibold">Add Music</span>
		</BitsDialog.Trigger>
		<Tabs.Root value="single" slot="content" class="w-full">
			<Tabs.List
				class="mx-auto mb-2 flex w-3/4 items-center justify-center gap-4 rounded-md bg-gray-12 px-4 py-2 text-gray-1"
			>
				<Tabs.Trigger
					value="single"
					class="rounded-md px-2 py-1 text-xl font-semibold lowercase data-[state=active]:bg-gray-3 data-[state=active]:text-gray-12"
					style="font-variant: small-caps;">Single</Tabs.Trigger
				>
				<Tabs.Trigger
					value="multiple"
					class="rounded-md px-2 py-1 text-xl font-semibold lowercase data-[state=active]:bg-gray-3 data-[state=active]:text-gray-12"
					style="font-variant: small-caps;">Multiple</Tabs.Trigger
				>
			</Tabs.List>
			<Tabs.Content value="single">
				<Form
					action="?/createSingleMusic"
					data={data.formSingle}
					method="POST"
					schema={createSingleMusicSchema}
					class="w-full space-y-4 aria-hidden:hidden"
					let:form
				>
					<fieldset class="flex w-full flex-col gap-2">
						<TextInput {form} field="title" label="Title" />
						<NumberInput {form} field="number" label="Number" min="1" />
						<FileInput
							{form}
							field="track"
							label="Track"
							accept={acceptedExtensions}
						/>
					</fieldset>
					<Button
						intent="primary"
						size="small"
						width="full"
						class="font-semibold lowercase"
						style="font-variant: small-caps;">Add</Button
					>
				</Form>
			</Tabs.Content>
			<Tabs.Content value="multiple">
				<Form
					action="?/createMultipleMusic"
					data={data.formMultiple}
					method="POST"
					schema={createMultipleMusicSchema}
					class="w-full space-y-4"
					let:form
				>
					<fieldset class="flex w-full flex-col gap-2">
						<FileInput
							{form}
							isMultiple={true}
							field="tracks"
							label="Tracks"
							accept={acceptedExtensions}
						/>
					</fieldset>
					<Button
						intent="primary"
						size="small"
						width="full"
						class="font-semibold lowercase"
						style="font-variant: small-caps;">Add</Button
					>
				</Form>
			</Tabs.Content>
		</Tabs.Root>
	</Dialog>
</div>
