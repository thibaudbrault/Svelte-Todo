<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import {
		Heart,
		Home,
		Library,
		LogIn,
		LogOut,
		Search,
		User,
	} from 'lucide-svelte';

	const topLinks = [
		{
			href: '/',
			name: 'Home',
			icon: Home,
		},
		{
			href: '/',
			name: 'Search',
			icon: Search,
		},
	];

	const middleLinks = [
		{
			href: '/library',
			name: 'Library',
			icon: Library,
		},
		{
			href: '/favorites',
			name: 'Favorites',
			icon: Heart,
		},
	];
</script>

<nav class="flex h-screen flex-col space-y-4 p-2">
	<div class="rounded-md bg-gray-2 px-12 py-4">
		<h1 class="flex justify-center pb-8 text-3xl font-semibold text-yellow-11">
			PokeMusic
		</h1>
		<ul class="flex flex-col gap-4 text-gray-11">
			{#each topLinks as link}
				<li>
					<a
						href={link.href}
						class="flex items-center gap-4 hover:text-gray-12"
					>
						<svelte:component this={link.icon} class="text-yellow-12" />
						<span class="font-semibold">{link.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<div
		class="flex h-full flex-col justify-between rounded-md bg-gray-2 px-12 py-4 text-gray-11"
	>
		<ul class="flex flex-col gap-4">
			{#each middleLinks as link}
				<li>
					<a
						href={link.href}
						class="flex items-center gap-4 hover:text-gray-12"
					>
						<svelte:component this={link.icon} class="text-yellow-12" />
						<span class="font-semibold">{link.name}</span>
					</a>
				</li>
			{/each}
		</ul>
		<ul class="flex flex-col gap-4">
			{#if $page.data.session}
				<li>
					<a href="/profile" class="flex items-center gap-4 hover:text-gray-12">
						<User class="text-yellow-12" />
						<span class="font-semibold">Profile</span>
					</a>
				</li>
				<li>
					<button
						on:click={() => signOut()}
						class="flex items-center gap-4 hover:text-gray-12"
					>
						<LogOut class="text-yellow-12" />
						<span class="font-semibold">Log Out</span>
					</button>
				</li>
			{:else}
				<li>
					<button
						on:click={() => signIn('github')}
						class="flex items-center gap-4 hover:text-gray-12"
					>
						<LogIn class="text-yellow-12" />
						<span class="font-semibold">Log In</span>
					</button>
				</li>
			{/if}
		</ul>
	</div>
</nav>
