<script lang="ts">
	import { page } from '$app/stores';
	import {
		Combobox,
		Dialog,
		FileInput,
		Form,
		NumberInput,
		TextInput,
	} from '$components';
	import type { SelectAlbum } from '$lib/db';
	import { COVER_EXTENSIONS } from '$lib/utils';
	import { updateAlbumSchema } from '$lib/validations';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { Gamepad2 } from 'lucide-svelte';

	const currentYear = new Date().getFullYear();

	export let album: SelectAlbum;
</script>

<Dialog title="Update album">
	<BitsDialog.Trigger slot="trigger" class="hover:text-yellow-12">
		{album.name}
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/updateAlbum"
			id="updateAlbum"
			data={$page.data.updateAlbumForm}
			schema={updateAlbumSchema}
			buttonText="Update"
			class="w-full space-y-4"
			let:form
		>
			<fieldset class="flex w-full flex-col gap-2">
				<input value={album.id} name="albumId" hidden />
				<TextInput {form} field="name" label="Name" placeholder={album.name} />
				<NumberInput
					{form}
					field="release"
					label="Release"
					min="1950"
					max={currentYear}
					placeholder={album.release}
				/>
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
					accept={COVER_EXTENSIONS}
				/>
			</fieldset>
		</Form>
	</div>
</Dialog>
