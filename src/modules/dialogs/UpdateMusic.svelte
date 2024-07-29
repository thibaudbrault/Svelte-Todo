<script lang="ts">
	import { page } from '$app/stores';
	import { Dialog, Form, TextInput } from '$components';
	import { updateMusicSchema } from '$lib/validation';
	import { Dialog as BitsDialog } from 'bits-ui';

	export let musicId: string;
</script>

<Dialog title="Update music">
	<BitsDialog.Trigger slot="trigger" class="triggerClass">
		Update
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/updateMusic"
			id="updateMusic"
			data={$page.data.updateMusicForm}
			schema={updateMusicSchema}
			buttonText="Update"
			class="w-full space-y-4"
			let:form
		>
			<input value={musicId} name="musicId" hidden />
			<TextInput field="name" label="Name" {form} />
		</Form>
	</div>
</Dialog>
