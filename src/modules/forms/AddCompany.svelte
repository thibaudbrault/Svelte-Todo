<script lang="ts">
	import { page } from '$app/stores';
	import { Dialog, Form, TextInput } from '$components';
	import { createCompanySchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { Plus } from 'lucide-svelte';
</script>

<Dialog title="New company">
	<BitsDialog.Trigger
		slot="trigger"
		class="flex items-center gap-4 hover:text-gray-12"
	>
		<Plus class="text-yellow-12" />
		<span class="font-semibold">Company</span>
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/createCompany"
			id="createCompany"
			data={$page.data.createCompanyForm}
			schema={createCompanySchema}
			class="w-full space-y-4"
			let:form
		>
			<fieldset class="flex w-full flex-col gap-2">
				<TextInput {form} field="name" label="Name" />
			</fieldset>
		</Form>
	</div>
</Dialog>
