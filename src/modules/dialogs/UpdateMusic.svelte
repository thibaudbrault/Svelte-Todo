<script lang="ts">
	import { Dialog } from '$components';
	import { Dialog as BitsDialog } from 'bits-ui';

	export let musicId: string;
</script>

<Dialog title="Update music">
	<BitsDialog.Trigger slot="trigger" class="triggerClass">
		Update
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<!-- <Form
			action="?/addToPlaylist"
			id="addToPlaylist"
			data={$page.data.addToPlaylistForm}
			schema={playlistSchema}
			buttonText="Add"
			class="w-full space-y-4"
			let:form
		> -->
		<input value={musicId} name="musicId" hidden />
		<!-- <Combobox
				{form}
				icon={ListMusic}
				items={$page.data.playlists}
				field="name"
				label="Playlist"
				placeholder="Select a playlist"
			/>
		</Form> -->
	</div>
</Dialog>
