<script lang="ts">
	import {
		Button,
		Dialog,
		FileInput,
		NumberInput,
		Switch,
		TextInput,
	} from '$components';
	import type { SelectMusic } from '$lib/db';
	import { trackId } from '$lib/store';
	import { format } from '$lib/utils';
	import {
		createSingleMusicSchema,
		type CreateSingleMusic,
	} from '$lib/validation';
	import { Clock } from 'lucide-svelte';
	import {
		superForm,
		type Infer,
		type SuperValidated,
	} from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let musics: SelectMusic[];
	export let selectedTrack: number | null;
	export let loadTrack: () => void;
	export let formSingle: SuperValidated<Infer<CreateSingleMusic>>;

	$: {
		selectedTrack = $trackId;
	}

	let checked: boolean = false;

	const { form, errors, enhance, allErrors } = superForm(formSingle, {
		validators: zod(createSingleMusicSchema),
		validationMethod: 'onblur',
	});

	const acceptedExtensions = '.flac, .mp3';
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
			use:enhance
		>
			<fieldset class="flex w-full flex-col gap-2">
				<input hidden value={checked} name="isMultiple" />
				<div class="flex flex-col gap-1">
					<TextInput
						name="title"
						label="Title"
						bind:value={$form.title}
						errors={$errors.title}
					/>
				</div>
				{#if !checked}
					<div class="flex flex-col gap-1">
						<NumberInput
							name="number"
							label="Number"
							min="1"
							bind:value={$form.number}
							errors={$errors.number}
						/>
					</div>
					<div class="flex flex-col gap-1">
						<NumberInput
							name="duration"
							label="Duration (in seconds)"
							min="0"
							bind:value={$form.duration}
							errors={$errors.duration}
						/>
					</div>
				{/if}
				<div class="flex items-center justify-between gap-2">
					<div class="flex flex-col gap-1">
						<FileInput
							name="track"
							label={`Track ${checked ? '(multiple)' : '(single)'}`}
							accept={acceptedExtensions}
							bind:value={$form.track}
							errors={$errors.track}
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
				style="font-variant: small-caps;"
				disabled={!!$allErrors.length}>Add</Button
			>
		</form>
	</Dialog>
</div>
