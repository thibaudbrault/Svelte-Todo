<script lang="ts">
	import { page } from '$app/stores';
	import { Combobox, Dialog, FileInput, Form, TextInput } from '$components';
	import { createAlbumSchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { Gamepad2, Plus } from 'lucide-svelte';

	const acceptedExtensions = '.jpg, .jpeg, .png, .webp';
</script>

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
			id="createAlbum"
			data={$page.data.createAlbumForm}
			schema={createAlbumSchema}
			class="w-full space-y-4"
			let:form
		>
			<fieldset class="flex w-full flex-col gap-2">
				<TextInput {form} field="name" label="Name" />
				<Combobox
					{form}
					icon={Gamepad2}
					items={$page.data.games}
					field="game"
					label="Game"
					placeholder="Select a game"
				/>
				<FileInput
					{form}
					field="cover"
					label="Cover"
					accept={acceptedExtensions}
				/>
			</fieldset>
		</Form>
	</div>
</Dialog>
