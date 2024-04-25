<script lang="ts">
	import { page } from '$app/stores';
	import { Dialog, Form, TextInput } from '$components';
	import type { SelectCompany } from '$lib/db';
	import { updateCompanySchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';

	export let company: SelectCompany;
</script>

<Dialog title="Update company">
	<BitsDialog.Trigger slot="trigger" class="hover:text-yellow-12">
		{company.name}
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/updateCompany"
			id="updateCompany"
			data={$page.data.updateCompanyForm}
			schema={updateCompanySchema}
			buttonText="Update"
			class="w-full space-y-4"
			let:form
		>
			<fieldset class="flex w-full flex-col gap-2">
				<input value={company.id} name="companyId" hidden />
				<TextInput
					{form}
					field="name"
					label="Name"
					placeholder={company.name}
				/>
			</fieldset>
		</Form>
	</div>
</Dialog>
