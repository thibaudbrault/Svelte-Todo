<script lang="ts">
	import { Button, Dialog, FileInput, TextInput } from '$components';
	import { createAlbumSchema, type CreateAlbum } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';
	import {
		AudioLines,
		CalendarDays,
		Heart,
		ListMusic,
		Plus,
	} from 'lucide-svelte';
	import {
		superForm,
		type Infer,
		type SuperValidated,
	} from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<CreateAlbum>>;

	let isValid: boolean = false;

	const { form, errors, enhance, allErrors, validateForm } = superForm(data, {
		validators: zod(createAlbumSchema),
		validationMethod: 'onblur',
	});

	allErrors.subscribe(async (val) => {
		if (val.length > 0) {
			isValid = false;
		} else {
			const res = await validateForm();
			isValid = res.valid;
		}
	});

	const acceptedExtensions = '.jpg, .jpeg, .png, .webp';

	const links = [
		{
			name: 'Feed',
			href: '/',
			icon: AudioLines,
		},
		{
			name: 'Playlists',
			href: '/playlists',
			icon: ListMusic,
		},
		{
			name: 'Favourites',
			href: '/favourites',
			icon: Heart,
		},
		{
			name: 'History',
			href: '/history',
			icon: CalendarDays,
		},
	];
</script>

<aside class="text-gray-11 flex flex-col gap-8 px-4 py-8">
	<ul class="flex flex-col gap-4">
		{#each links as link}
			<li>
				<a href={link.href} class="hover:text-gray-12 flex items-center gap-4">
					<svelte:component this={link.icon} class="text-yellow-12" />
					<span class="font-semibold">{link.name}</span>
				</a>
			</li>
		{/each}
	</ul>
	<div class="flex flex-col gap-2">
		<p class="text-sm font-bold">Admin</p>
		<ul class="flex flex-col gap-4">
			<li>
				<Dialog title="New album">
					<BitsDialog.Trigger
						slot="trigger"
						class="hover:text-gray-12 flex items-center gap-4"
					>
						<Plus class="text-yellow-12" />
						<span class="font-semibold">Album</span>
					</BitsDialog.Trigger>
					<form
						slot="content"
						action="?/createAlbum"
						method="POST"
						enctype="multipart/form-data"
						class="w-full space-y-4"
						use:enhance
					>
						<fieldset class="flex w-full flex-col gap-2">
							<TextInput
								name="name"
								label="Name"
								bind:value={$form.name}
								errors={$errors.name}
							/>
							<FileInput
								name="cover"
								label="Cover"
								accept={acceptedExtensions}
								bind:value={$form.cover}
								errors={$errors.cover}
							/>
						</fieldset>
						<Button
							intent="primary"
							size="small"
							width="full"
							class="font-semibold lowercase"
							disabled={!isValid}
							style="font-variant: small-caps;">Add</Button
						>
					</form>
				</Dialog>
			</li>
		</ul>
	</div>
</aside>
