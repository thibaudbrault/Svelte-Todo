<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Dialog, Form, InPlaceEdit, TextInput } from '$components';
	import { playlistSchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';
</script>

<section class="flex flex-col gap-8">
	{#if $page.data.playlists.length > 0}
		<ul class="flex flex-col gap-2">
			{#each $page.data.playlists as playlist (playlist.id)}
				<li
					class="flex items-center justify-between rounded-md border border-gray-5 px-4 py-2 hover:border-gray-6"
				>
					<!-- <p class="font-semibold">{playlist.name}</p> -->
					<InPlaceEdit
						value={playlist.name}
						id={playlist.id}
						userId={playlist.userId}
						action="?/updatePlaylist"
						schema={playlistSchema}
						data={$page.data.playlistForm}
						textClass="font-semibold hover:underline"
					/>
					<form method="POST" use:enhance action="?/deletePlaylist">
						<input value={playlist.id} name="id" hidden />
						<input value={playlist.userId} name="userId" hidden />
						<button>X</button>
					</form>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="col-span-5 py-4 text-center text-xl font-bold capitalize">
			No playlist
		</p>
	{/if}
	<Dialog title="New playlist">
		<BitsDialog.Trigger
			slot="trigger"
			class="!mb-16 w-full rounded-md bg-transparent px-4 py-2 text-gray-12 shadow-sm shadow-grayA-7 hover:shadow-grayA-8"
		>
			<span class="font-semibold">New Playlist</span>
		</BitsDialog.Trigger>
		<div slot="content" class="w-full">
			<Form
				action="?/createPlaylist"
				id="createPlaylist"
				data={$page.data.playlistForm}
				schema={playlistSchema}
				class="w-full space-y-4"
				let:form
			>
				<fieldset class="flex w-full flex-col gap-2">
					<input value={$page.data.user.id} name="userId" hidden />
					<TextInput {form} field="name" label="Name" />
				</fieldset>
			</Form>
		</div>
	</Dialog>
</section>
