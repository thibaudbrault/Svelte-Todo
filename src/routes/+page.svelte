<script lang="ts">
	import { Button, Input } from '$lib';

	let text: string = 'Hello World!';
	let todos: string[] = [];

	const addTodo = (text: string) => {
		todos.push(text);
		todos = todos;
	};

	const deleteTodo = (i: number) => {
		todos.splice(i, 1);
		todos = todos;
	};
</script>

<main>
	<h1>Welcome to SvelteKit</h1>
	<ul>
		{#each todos as todo, i}
			<li>
				<p>{todo}</p>
				<button on:click={() => deleteTodo(i)}>X</button>
			</li>
		{/each}
	</ul>
	<p>{text}</p>
	<Input placeholder={'New todo'} bind:value={text} />
	<Button {addTodo} {text} />
</main>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
