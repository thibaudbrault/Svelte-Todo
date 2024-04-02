<script lang="ts">
	// import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let value: string;
	export let action: string;
	export let schema;
	export let data;
	export let id: string = '';
	export let userId: string = '';
	export let textClass: string = '';

	let editing: boolean = false;
	// let original: string;

	// onMount(() => {
	// 	original = value;
	// });

	function edit() {
		editing = true;
	}

	const { form, enhance, submit } = superForm(data, {
		validators: zod(schema),
	});
</script>

{#if editing}
	<form method="POST" {action} use:enhance>
		{#if id}
			<input value={id} name="id" hidden />
		{/if}
		{#if userId}
			<input value={userId} name="userId" hidden />
		{/if}
		<input bind:value={$form.name} on:blur={submit} />
	</form>
{:else}
	<button on:click={edit} class={textClass}>
		{value}
	</button>
{/if}
