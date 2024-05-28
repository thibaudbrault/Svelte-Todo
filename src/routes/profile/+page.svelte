<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button, Form, TextInput } from '$components';
	import { updateUserSchema } from '$lib/validation';
</script>

<section class="flex flex-col gap-8">
	<h2 class="text-4xl font-bold">{$page.data.profile.name}</h2>
	<div class="flex items-end gap-8">
		<Form
			action="?/updateUser"
			id="updateUser"
			data={$page.data.updateUserForm}
			schema={updateUserSchema}
			buttonText="Update"
			class="space-y-4"
			let:form
		>
			<fieldset class="flex flex-col gap-2">
				<input value={$page.data.profile.id} name="id" hidden />
				<TextInput
					{form}
					field="name"
					label="Name"
					placeholder={$page.data.profile.name}
				/>
			</fieldset>
		</Form>
		<form method="POST" use:enhance action="?/deleteUser">
			<Button
				intent="destructive"
				size="small"
				class="font-semibold lowercase"
				style="font-variant: small-caps;">Delete account</Button
			>
		</form>
	</div>
</section>
