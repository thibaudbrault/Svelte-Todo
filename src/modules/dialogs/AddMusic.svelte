<script>
	import { page } from '$app/stores';
	import { Dialog, FileInput, Form } from '$components';
	import { createMusicSchema } from '$lib/validations';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { Plus } from 'lucide-svelte';

	const acceptedExtensions = '.flac, .mp3';
</script>

<Dialog title="New music">
	<BitsDialog.Trigger
		slot="trigger"
		class="flex items-center gap-1 bg-transparent hover:text-yellow-12"
	>
		<Plus />
		<span class="font-semibold">Add</span>
	</BitsDialog.Trigger>
	<div slot="content" class="w-full">
		<Form
			action="?/createMusic"
			id="createMusic"
			data={$page.data.createMusicForm}
			schema={createMusicSchema}
			buttonText="Create"
			class="w-full space-y-4"
			let:form
		>
			<fieldset class="flex w-full flex-col gap-2">
				<FileInput
					{form}
					isMultiple={true}
					field="tracks"
					label="Tracks"
					accept={acceptedExtensions}
				/>
			</fieldset>
		</Form>
	</div>
</Dialog>
