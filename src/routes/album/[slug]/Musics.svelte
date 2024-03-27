<script lang="ts">
	import { page } from '$app/stores';
	import {
		Button,
		Dialog,
		FileInput,
		Form,
		NumberInput,
		ScrollArea,
		TextInput,
	} from '$components';
	import { trackId } from '$lib/store';
	import { format } from '$lib/utils';
	import { creatOneMusicSchema, createManyMusicSchema } from '$lib/validation';
	import { Dialog as BitsDialog, Separator, Tabs } from 'bits-ui';
	import { Heart, MoreHorizontal } from 'lucide-svelte';

	export let selectedTrack: number | null;
	export let loadTrack: () => void;

	$: {
		selectedTrack = $trackId;
	}

	const acceptedExtensions = '.flac, .mp3';

	let favorites: number[] = [];

	const handleFavorite = (musicId: number) => {
		const index = favorites.indexOf(musicId);
		if (index !== -1) {
			favorites.splice(index, 1);
			favorites = favorites;
		} else {
			favorites.push(musicId);
			favorites = favorites;
		}
	};
</script>

<div class="w-full space-y-2 p-4">
	<Separator.Root class="mx-auto h-px w-11/12 bg-gray-5" />
	{#if $page.data.musics.length > 0}
		<div class="h-[700px]">
			<ScrollArea>
				<div class="space-y-2 pr-4">
					{#each $page.data.musics as music, index}
						<button
							on:click={() => {
								$trackId = index;
								loadTrack();
							}}
							class={`flex w-full cursor-pointer items-center justify-between rounded-md p-2 ${selectedTrack === index ? 'bg-gray-12 text-gray-1' : 'hover:bg-grayA-5'}`}
						>
							<div class="flex flex-col items-start gap-1">
								<p class="text-xl font-bold">{music.name}</p>
								{#each music.musicsToAuthors as authors}
									<p
										class="flex flex-wrap items-center gap-2 text-xs font-medium capitalize"
									>
										{authors.author.name}
									</p>
								{/each}
							</div>
							<div class="flex items-center gap-8">
								<p class="text-sm font-medium">{format(music.duration)}</p>
								<Button
									intent="ghost"
									size="icon"
									class={`${favorites.includes(music.id) ? 'text-red-400' : 'text-inherit'}`}
									on:click={() => handleFavorite(music.id)}
								>
									<Heart
										class={`${favorites.includes(music.id) ? 'fill-red-500' : 'bg-transparent'}`}
									/>
								</Button>
								<p><MoreHorizontal /></p>
							</div>
						</button>
					{/each}
				</div>
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
			class="!mb-16 w-full rounded-md bg-transparent px-4 py-2 text-gray-12 shadow-sm shadow-grayA-7 hover:shadow-grayA-8"
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
					action="?/creatOneMusic"
					data={$page.data.formSingle}
					method="POST"
					schema={creatOneMusicSchema}
					class="w-full space-y-4"
					let:form
				>
					<fieldset class="flex w-full flex-col gap-2">
						<TextInput {form} field="name" label="Name" />
						<NumberInput {form} field="number" label="Number" min="1" />
						<FileInput
							{form}
							field="track"
							label="Track"
							accept={acceptedExtensions}
						/>
					</fieldset>
				</Form>
			</Tabs.Content>
			<Tabs.Content value="multiple">
				<Form
					action="?/createManyMusic"
					data={$page.data.formMultiple}
					method="POST"
					schema={createManyMusicSchema}
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
				</Form>
			</Tabs.Content>
		</Tabs.Root>
	</Dialog>
</div>
