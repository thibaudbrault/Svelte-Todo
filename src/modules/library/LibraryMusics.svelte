<script lang="ts">
	import {
		Button,
		Dialog,
		FileInput,
		NumberInput,
		TextInput,
	} from '$components';
	import type { SelectMusic } from '$lib/db';
	import { trackId } from '$lib/store';
	import { format } from '$lib/utils';
	import {
		createMultipleMusicSchema,
		createSingleMusicSchema,
		type CreateMultipleMusic,
		type CreateSingleMusic,
	} from '$lib/validation';
	import { Separator } from 'bits-ui';
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
	export let formSingleProps: SuperValidated<Infer<CreateSingleMusic>>;
	export let formMultipleProps: SuperValidated<Infer<CreateMultipleMusic>>;

	$: {
		selectedTrack = $trackId;
	}

	let isMultiple: boolean = true;
	let isValidSingle: boolean = false;
	let isValidMultiple: boolean = false;

	const {
		form: formSingle,
		errors: errorsSingle,
		enhance: enhanceSingle,
		allErrors: allErrorsSingle,
		validateForm: validateFormSingle,
	} = superForm(formSingleProps, {
		validators: zod(createSingleMusicSchema),
		validationMethod: 'onblur',
	});

	const {
		form: formMultiple,
		errors: errorsMultiple,
		enhance: enhanceMultiple,
		allErrors: allErrorsMultiple,
		validateForm: validateFormMultiple,
	} = superForm(formMultipleProps, {
		validators: zod(createMultipleMusicSchema),
		validationMethod: 'onblur',
	});

	allErrorsSingle.subscribe(async (val) => {
		if (val.length > 0) {
			isValidSingle = false;
		} else {
			const res = await validateFormSingle();
			isValidSingle = res.valid;
		}
	});

	allErrorsMultiple.subscribe(async (val) => {
		if (val.length > 0) {
			isValidMultiple = false;
		} else {
			const res = await validateFormMultiple();
			isValidMultiple = res.valid;
		}
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
						{music.number}
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
		<div slot="content" class="flex w-full flex-col gap-4">
			<form
				action="?/createSingleMusic"
				method="POST"
				enctype="multipart/form-data"
				class="w-full space-y-4"
				use:enhanceSingle
			>
				<fieldset class="flex w-full flex-col gap-2">
					<div class="flex flex-col gap-1">
						<TextInput
							name="title"
							label="Title"
							bind:value={$formSingle.title}
							errors={$errorsSingle.title}
						/>
					</div>
					<div class="flex flex-col gap-1">
						<NumberInput
							name="number"
							label="Number"
							min="1"
							bind:value={$formSingle.number}
							errors={$errorsSingle.number}
						/>
					</div>
					<div class="flex flex-col gap-1">
						<NumberInput
							name="duration"
							label="Duration (in seconds)"
							min="1"
							bind:value={$formSingle.duration}
							errors={$errorsSingle.duration}
						/>
					</div>
					<div class="flex items-center justify-between gap-2">
						<div class="flex flex-col gap-1">
							<FileInput
								name="track"
								label="Track"
								accept={acceptedExtensions}
								bind:value={$formSingle.track}
								errors={$errorsSingle.track}
							/>
						</div>
					</div>
				</fieldset>
				<Button
					intent="primary"
					size="small"
					width="full"
					class="font-semibold lowercase"
					style="font-variant: small-caps;"
					disabled={!isValidSingle}>Add</Button
				>
			</form>
			<Separator.Root class="mx-auto block h-px w-11/12 bg-gray-6" />
			<form
				action="?/createMultipleMusic"
				method="POST"
				enctype="multipart/form-data"
				class="w-full space-y-4"
				use:enhanceMultiple
			>
				<fieldset class="flex w-full flex-col gap-2">
					<div class="flex flex-col gap-1">
						<NumberInput
							name="number"
							label="Number"
							min="1"
							bind:value={$formMultiple.number}
							errors={$errorsMultiple.number}
						/>
					</div>
					<div class="flex items-center justify-between gap-2">
						<div class="flex flex-col gap-1">
							<FileInput
								name="tracks"
								label="Tracks"
								multiple={isMultiple}
								accept={acceptedExtensions}
								bind:value={$formMultiple.tracks}
								errors={$errorsMultiple.tracks}
							/>
						</div>
					</div>
				</fieldset>
				<Button
					intent="primary"
					size="small"
					width="full"
					class="font-semibold lowercase"
					style="font-variant: small-caps;"
					disabled={!isValidMultiple}>Add</Button
				>
			</form>
		</div>
	</Dialog>
</div>
