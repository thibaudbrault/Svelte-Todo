<script>
	import { page } from '$app/stores';
	import { Dialog, Form, TextInput } from '$components';
	import { playlistSchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';
</script>

<Dialog title="New playlist">
	<BitsDialog.Trigger
		slot="trigger"
		class="!mb-16 w-full rounded-md bg-transparent px-4 py-2 text-gray-12 shadow-sm shadow-grayA-7 hover:shadow-grayA-8"
	>
		<span
			class="text-lg font-semibold lowercase"
			style="font-variant: small-caps;">New Playlist</span
		>
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/createPlaylist"
			id="createPlaylist"
			data={$page.data.playlistForm}
			schema={playlistSchema}
			buttonText="Create"
			class="w-full space-y-4"
			let:form
		>
			<input value={$page.data.profile.id} name="userId" hidden />
			<TextInput {form} field="name" label="Name" />
		</Form>
	</div>
</Dialog>
