<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Combobox, Dialog, Form, TextInput } from '$components';
	import { createGameSchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { Plus } from 'lucide-svelte';

	const companies = [
		{
			label: 'Nintendo',
			value: 'nintendo',
		},
		{
			label: 'Sony',
			value: 'sony',
		},
		{
			label: 'Ubisoft',
			value: 'ubisoft',
		},
	];
</script>

<Dialog title="New album">
	<BitsDialog.Trigger
		slot="trigger"
		class="flex items-center gap-4 hover:text-gray-12"
	>
		<Plus class="text-yellow-12" />
		<span class="font-semibold">Game</span>
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/createGame"
			data={$page.data.createGameForm}
			method="POST"
			schema={createGameSchema}
			class="w-full space-y-4"
			let:form
		>
			<fieldset class="flex w-full flex-col gap-2">
				<TextInput {form} field="name" label="Name" />
				<Combobox
					{form}
					items={companies}
					field="company"
					label="Company"
					placeholder="Select a company"
				/>
			</fieldset>
			<Button
				intent="primary"
				size="small"
				width="full"
				class="font-semibold lowercase"
				style="font-variant: small-caps;">Add</Button
			>
		</Form>
	</div>
</Dialog>
