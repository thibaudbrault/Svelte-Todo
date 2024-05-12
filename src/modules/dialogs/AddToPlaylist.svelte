<script lang="ts">
	import { page } from '$app/stores';
	import { Combobox, Dialog, Form } from '$components';
	import { playlistSchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { ListMusic } from 'lucide-svelte';

	export let musicId: string;
</script>

<Dialog title="Add to playlist">
	<BitsDialog.Trigger slot="trigger" class="triggerClass">
		Playlist
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/addToPlaylist"
			id="addToPlaylist"
			data={$page.data.addToPlaylistForm}
			schema={playlistSchema}
			buttonText="Add"
			class="w-full space-y-4"
			let:form
		>
			<input value={$page.data.user.id} name="userId" hidden />
			<input value={musicId} name="musicId" hidden />
			<Combobox
				{form}
				icon={ListMusic}
				items={$page.data.playlists}
				field="name"
				label="Playlist"
				placeholder="Select a playlist"
			/>
		</Form>
	</div>
</Dialog>
