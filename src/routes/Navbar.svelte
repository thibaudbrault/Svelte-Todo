<script>
	import { page } from '$app/stores';
	import { Button, Search } from '$components';
	import { signIn, signOut } from '@auth/sveltekit/client';
</script>

<nav class="col-span-6 row-start-1 grid grid-cols-6 items-center bg-gray-1 p-4">
	<h1 class="text-2xl font-bold">PokeMusic</h1>
	<div class="col-span-3 col-start-2 w-full justify-self-start">
		<Search placeholder="Search by albums or songs" />
	</div>
	<ul class="col-span-2 flex items-center gap-2 justify-self-end px-4">
		{#if $page.data.session}
			<li>
				<Button rounded="full" size="large" weight="semibold">Profile</Button>
			</li>
			<li>
				<Button
					intent="secondary"
					rounded="full"
					size="large"
					weight="semibold"
					on:click={() => signOut()}
				>
					Log Out
				</Button>
			</li>
		{:else}
			<li>
				<Button
					rounded="full"
					size="large"
					weight="semibold"
					on:click={() => signIn('github')}
				>
					Log In
				</Button>
			</li>
		{/if}
	</ul>
</nav>
