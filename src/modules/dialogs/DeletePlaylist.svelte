<script lang="ts">
	import { page } from '$app/stores';
	import { Dialog, Form, TextInput } from '$components';
	import type { Playlist } from '$lib/db';
	import { deletePlaylistSchema } from '$lib/validations';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { X } from 'lucide-svelte';

	export let playlist: Playlist;
</script>

<Dialog title="Delete playlist">
	<BitsDialog.Trigger slot="trigger" class="hover:text-red-11">
		<X class="size-5" />
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/deletePlaylist"
			id="deletePlaylist"
			data={$page.data.deletePlaylistForm}
			schema={deletePlaylistSchema}
			buttonText="Delete"
			class="w-full space-y-4"
			let:form
		>
			<fieldset class="flex w-full flex-col gap-2">
				<p class="text-center">
					Are you sure you want to delete this playlist ? <br />Type
					<span class="font-semibold text-red-11">confirm</span> to delete it
				</p>
				<input value={playlist.id} name="playlistId" hidden />
				<input value={$page.data.profile.id} name="userId" hidden />
				<TextInput
					{form}
					field="confirm"
					label="Enter confirm"
					placeholder="confirm"
				/>
			</fieldset>
		</Form>
	</div>
</Dialog>
