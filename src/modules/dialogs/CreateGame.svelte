<script lang="ts">
	import { page } from '$app/stores';
	import { Combobox, Dialog, FileInput, Form, TextInput } from '$components';
	import { COVER_EXTENSIONS } from '$lib/utils';
	import { createGameSchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { Plus, Building2 } from 'lucide-svelte';
</script>

<Dialog title="New game">
	<BitsDialog.Trigger
		slot="trigger"
		class="flex items-center gap-4 p-2 hover:bg-gray-4 hover:text-gray-12"
	>
		<Plus class="text-yellow-12" />
		<span class="font-semibold">Game</span>
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/createGame"
			id="createGame"
			data={$page.data.createGameForm}
			schema={createGameSchema}
			buttonText="Create"
			class="w-full space-y-4"
			let:form
		>
			<fieldset class="flex w-full flex-col gap-2">
				<TextInput {form} field="name" label="Name" />
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
