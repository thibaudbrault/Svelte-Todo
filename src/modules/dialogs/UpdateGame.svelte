<script lang="ts">
	import { page } from '$app/stores';
	import { Combobox, Dialog, Form, TextInput } from '$components';
	import type { SelectGame } from '$lib/db';
	import { updateGameSchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { Building2 } from 'lucide-svelte';

	export let game: SelectGame;
</script>

<Dialog title="Update game">
	<BitsDialog.Trigger slot="trigger" class="hover:text-yellow-12">
		{game.name}
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
		</Form>
	</div>
</Dialog>
