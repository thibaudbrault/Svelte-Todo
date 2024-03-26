<script>
	import { page } from '$app/stores';
	import { Button, Search } from '$components';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { Avatar } from 'bits-ui';
</script>

<nav
	class="col-span-5 col-start-2 row-start-1 grid grid-cols-5 items-center rounded-md border border-gray-5 bg-gray-2 p-4"
>
	<div class="col-span-3 w-full justify-self-start">
		<Search placeholder="Search by albums or songs" />
	</div>
	<ul class="col-span-2 flex items-center gap-4 justify-self-end px-4">
		{#if $page.data.session}
			<li>
				<Avatar.Root class="h-8 w-8 rounded-full">
					<a
						href="/profile"
						class="flex h-full w-full items-center justify-center overflow-hidden rounded-full"
					>
						<Avatar.Image src={$page.data.user.image} />
						<Avatar.Fallback>FB</Avatar.Fallback>
					</a>
				</Avatar.Root>
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
