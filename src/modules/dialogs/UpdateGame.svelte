<script lang="ts">
	import { page } from '$app/stores';
	import { Combobox, Dialog, FileInput, Form, TextInput } from '$components';
	import type { SelectGame } from '$lib/db';
	import { COVER_EXTENSIONS } from '$lib/utils';
	import { updateGameSchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { Building2 } from 'lucide-svelte';

	export let game: SelectGame;
</script>

<Dialog title="Update game">
	<BitsDialog.Trigger slot="trigger" class="hover:text-yellow-12">
		<div
			class="relative flex size-48 items-center justify-center rounded-md bg-gray-3 bg-cover bg-center bg-no-repeat p-4 text-center"
			style="background-image: url({game.cover})"
		>
			<p class="z-10 text-3xl font-semibold hover:text-yellow-12">
				{game.name}
			</p>
			<div class="absolute inset-0 rounded-md bg-gray-1 opacity-20" />
		</div>
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/updateGame"
			id="updateGame"
			data={$page.data.updateGameForm}
			schema={updateGameSchema}
			buttonText="Update"
			class="w-full space-y-4"
			let:form
		>
			<fieldset class="flex w-full flex-col gap-2">
				<input value={game.id} name="gameId" hidden />
				<TextInput {form} field="name" label="Name" placeholder={game.name} />
				<Combobox
					{form}
					icon={Building2}
					items={$page.data.companies}
					field="company"
					label="Company"
					placeholder="Select a company"
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
