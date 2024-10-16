<script lang="ts">
	import { page } from '$app/stores';
	import { Dialog, Form, TextInput } from '$components';
	import type { Playlist } from '$lib/db';
	import { updatePlaylistSchema } from '$lib/validations';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { Pen } from 'lucide-svelte';

	export let playlist: Playlist;
</script>

<Dialog title="Update playlist">
	<BitsDialog.Trigger slot="trigger" class="hover:text-yellow-12">
		<Pen class="size-5" />
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/updatePlaylist"
			id="updatePlaylist"
			data={$page.data.updatePlaylistForm}
			schema={updatePlaylistSchema}
			buttonText="Update"
			class="w-full space-y-4"
			let:form
		>
			<fieldset class="flex w-full flex-col gap-2">
				<input value={playlist.id} name="playlistId" hidden />
				<TextInput
					{form}
					field="name"
					label="Name"
					placeholder={playlist.name}
				/>
			</fieldset>
		</Form>
	</div>
</Dialog>
