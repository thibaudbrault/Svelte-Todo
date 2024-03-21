<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Dialog, FileInput, Form, TextInput } from '$components';
	import { createAlbumSchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';
	import {
		AudioLines,
		CalendarDays,
		Heart,
		ListMusic,
		Plus,
	} from 'lucide-svelte';

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
			name: 'Favorites',
			href: '/favorites',
			icon: Heart,
		},
		{
			name: 'History',
			href: '/history',
			icon: CalendarDays,
		},
	];
</script>

<aside class="flex flex-col gap-8 px-4 py-8 text-gray-11">
	<ul class="flex flex-col gap-4">
		{#each links as link}
			<li>
				<a href={link.href} class="flex items-center gap-4 hover:text-gray-12">
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
						class="flex items-center gap-4 hover:text-gray-12"
					>
						<Plus class="text-yellow-12" />
						<span class="font-semibold">Album</span>
					</BitsDialog.Trigger>
					<div slot="content" class="w-full">
						<Form
							action="?/createAlbum"
							data={$page.data.form}
							method="POST"
							schema={createAlbumSchema}
							class="w-full space-y-4"
							let:form
						>
							<fieldset class="flex w-full flex-col gap-2">
								<TextInput {form} field="name" label="Name" />
								<FileInput
									{form}
									field="cover"
									label="Cover"
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
					</div>
				</Dialog>
			</li>
		</ul>
	</div>
</aside>
