<script>
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Button, Dialog } from '$components';
	import { Dialog as BitsDialog } from 'bits-ui';
	import { Loader2Icon, Minus } from 'lucide-svelte';

	let submitting = false;
</script>

<Dialog title="Delete musics">
	<BitsDialog.Trigger
		slot="trigger"
		class="flex items-center gap-1 bg-transparent hover:text-yellow-12"
	>
		<Minus />
		<span class="font-semibold">Delete</span>
	</BitsDialog.Trigger>
	<form
		slot="content"
		method="POST"
		use:enhance={() => {
			submitting = true;
			return ({ update, result }) => {
				if (result.type == 'failure') {
					applyAction(result).finally(async () => {
						submitting = false;
					});
				} else {
					update().finally(async () => {
						submitting = false;
						await invalidateAll();
					});
				}
			};
		}}
		action="?/deleteMusics"
		id="deleteMusics"
		buttonText="Delete"
		class="w-full space-y-4"
	>
		<Button
			intent="primary"
			size="small"
			width="full"
			class="font-semibold lowercase"
			style="font-variant: small-caps;"
			disabled={submitting}
		>
			{#if submitting}
				<Loader2Icon class="animate-spin" />
			{:else}
				Delete
			{/if}
		</Button>
	</form>
</Dialog>
