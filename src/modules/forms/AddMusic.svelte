<script>
	import { page } from '$app/stores';
	import { Dialog, FileInput, Form, NumberInput, TextInput } from '$components';
	import { creatOneMusicSchema, createManyMusicSchema } from '$lib/validation';
	import { Dialog as BitsDialog, Tabs } from 'bits-ui';
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
	<Tabs.Root value="single" slot="content" class="w-full">
		<Tabs.List
			class="mx-auto mb-2 flex w-3/4 items-center justify-center gap-4 rounded-md bg-gray-12 px-4 py-2 text-gray-1"
		>
			<Tabs.Trigger
				value="single"
				class="rounded-md px-2 py-1 text-xl font-semibold lowercase data-[state=active]:bg-gray-3 data-[state=active]:text-gray-12"
				style="font-variant: small-caps;">Single</Tabs.Trigger
			>
			<Tabs.Trigger
				value="multiple"
				class="rounded-md px-2 py-1 text-xl font-semibold lowercase data-[state=active]:bg-gray-3 data-[state=active]:text-gray-12"
				style="font-variant: small-caps;">Multiple</Tabs.Trigger
			>
		</Tabs.List>
		<Tabs.Content value="single">
			<Form
				action="?/creatOneMusic"
				id="createOneMusic"
				data={$page.data.formSingle}
				schema={creatOneMusicSchema}
				buttonText="Add"
				class="w-full space-y-4"
				let:form
			>
				<fieldset class="flex w-full flex-col gap-2">
					<TextInput {form} field="name" label="Name" />
					<NumberInput {form} field="number" label="Number" min="1" />
					<FileInput
						{form}
						field="track"
						label="Track"
						accept={acceptedExtensions}
					/>
				</fieldset>
			</Form>
		</Tabs.Content>
		<Tabs.Content value="multiple">
			<Form
				action="?/createManyMusic"
				id="createManyMusic"
				data={$page.data.formMultiple}
				schema={createManyMusicSchema}
				buttonText="Add"
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
		</Tabs.Content>
	</Tabs.Root>
</Dialog>
