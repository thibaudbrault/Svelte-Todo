<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Dialog, FileInput, TextInput } from '$components';
	import { middleLinks, topLinks } from '$lib/utils';
	import { createAlbumSchema, type CreateAlbum } from '$lib/validation';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { LogIn, LogOut, Plus, User } from 'lucide-svelte';
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
</script>

<nav class="flex h-screen flex-col space-y-4 p-2">
	<div class="rounded-md bg-gray-2 px-12 py-4">
		<h1 class="flex justify-center pb-8 text-3xl font-semibold text-yellow-11">
			PokeMusic
		</h1>
		<ul class="flex flex-col gap-4 text-gray-11">
			{#each topLinks as link}
				<li>
					<a
						href={link.href}
						class="flex items-center gap-4 hover:text-gray-12"
					>
						<svelte:component this={link.icon} class="text-yellow-12" />
						<span class="font-semibold">{link.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<div
		class="flex h-full flex-col justify-between rounded-md bg-gray-2 px-12 py-4 text-gray-11"
	>
		<ul class="flex flex-col gap-4">
			{#each middleLinks as link}
				<li>
					<a
						href={link.href}
						class="flex items-center gap-4 hover:text-gray-12"
					>
						<svelte:component this={link.icon} class="text-yellow-12" />
						<span class="font-semibold">{link.name}</span>
					</a>
				</li>
			{/each}
			<li>
				<Dialog title="New album" trigger="Add album">
					<BitsDialog.Trigger
						slot="trigger"
						class="flex items-center gap-4 hover:text-gray-12"
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
		<ul class="flex flex-col gap-4">
			{#if $page.data.session}
				<li>
					<a href="/profile" class="flex items-center gap-4 hover:text-gray-12">
						<User class="text-yellow-12" />
						<span class="font-semibold">Profile</span>
					</a>
				</li>
				<li>
					<button
						on:click={() => signOut()}
						class="flex items-center gap-4 hover:text-gray-12"
					>
						<LogOut class="text-yellow-12" />
						<span class="font-semibold">Log Out</span>
					</button>
				</li>
			{:else}
				<li>
					<button
						on:click={() => signIn('github')}
						class="flex items-center gap-4 hover:text-gray-12"
					>
						<LogIn class="text-yellow-12" />
						<span class="font-semibold">Log In</span>
					</button>
				</li>
			{/if}
		</ul>
	</div>
</nav>
