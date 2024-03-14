<script>
	import { page } from '$app/stores';
	import { Button, Search } from '$components';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { LogOut, User } from 'lucide-svelte';
</script>

<nav class="bg-gray-1 col-span-6 row-start-1 grid grid-cols-6 items-center p-4">
	<h1 class="text-2xl font-bold">PokeMusic</h1>
	<div class="col-span-3 col-start-2 w-full justify-self-start">
		<Search placeholder="Search by albums or songs" />
	</div>
	<div class="col-span-2 gap-4 justify-self-end bg-green-500 px-4">
		<ul class="flex flex-col gap-4">
			{#if $page.data.session}
				<li>
					<a href="/profile">
						<User class="text-yellow-12" />
					</a>
				</li>
				<li>
					<button on:click={() => signOut()}>
						<LogOut class="text-yellow-12" />
					</button>
				</li>
			{:else}
				<li>
					<Button
						rounded="full"
						size="large"
						weight="semibold"
						on:click={() => signIn('github')}>Log In</Button
					>
				</li>
			{/if}
		</ul>
	</div>
</nav>
