<script lang="ts">
	import { page } from '$app/stores';
	import { CreateAlbum, CreateCompany, CreateGame } from '$modules';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import {
		AudioLines,
		LibraryBig,
		LogInIcon,
		LogOutIcon,
		SearchIcon,
		Settings,
		User2,
	} from 'lucide-svelte';

	const links = [
		{
			name: 'Feed',
			href: '/',
			icon: AudioLines,
		},
		{
			name: 'Search',
			href: '/search',
			icon: SearchIcon,
		},
		{
			name: 'Library',
			href: '/library',
			icon: LibraryBig,
		},
	];
</script>

<aside class="hidden flex-col gap-8 p-4 text-gray-11 md:flex">
	<h1 class="text-3xl font-bold text-gray-12">GameMusic</h1>
	<div class="flex flex-col gap-2">
		{#each links as link}
			<a
				href={link.href}
				class={`flex items-center gap-4 rounded-md p-2 ${$page.url.pathname === link.href ? 'bg-gray-12 text-gray-1 [&_svg]:text-gray-1' : 'hover:text-gray-12'}`}
				class:active={$page.url.pathname.includes(link.href)}
			>
				<svelte:component this={link.icon} class="text-yellow-12" />
				<span class="font-semibold">{link.name}</span>
			</a>
		{/each}
	</div>
	<div class="flex flex-col gap-2">
		<p class="text-sm font-bold">User</p>
		<div class="flex flex-col gap-2">
			{#if $page.data.session}
				<a
					href="/profile"
					class={`flex items-center gap-4 rounded-md p-2 ${$page.url.pathname === '/profile' ? 'bg-gray-12 text-gray-1 [&_svg]:text-gray-1' : 'hover:text-gray-12'}`}
					class:active={$page.url.pathname.includes('/profile')}
				>
					<User2 class="text-yellow-12" />
					<span class="font-semibold">Profile</span>
				</a>
				<button
					class="flex items-center gap-4 rounded-md p-2 hover:text-gray-12"
					on:click={() => signOut()}
				>
					<LogOutIcon class="text-yellow-12" />
					<span class="font-semibold">Log Out</span>
				</button>
			{:else}
				<button
					class="flex items-center gap-4 rounded-md hover:text-gray-12"
					on:click={() => signIn('github')}
				>
					<LogInIcon class="text-yellow-12" />
					<span class="font-semibold">Log In</span>
				</button>
			{/if}
		</div>
	</div>
	{#if $page.data.user && $page.data.user.role === 'admin'}
		<div class="flex flex-col gap-2">
			<p class="text-sm font-bold">Admin</p>
			<div class="flex flex-col gap-4">
				<CreateAlbum />
				<CreateGame />
				<CreateCompany />
				<a href="/settings" class="flex items-center gap-4 hover:text-gray-12">
					<Settings class="text-yellow-12" />
					<span class="font-semibold">Settings</span>
				</a>
			</div>
		</div>
	{/if}
</aside>

<nav class="mx-auto flex w-11/12 justify-between md:hidden">
	{#each links as link}
		<a
			href={link.href}
			class={`flex items-center gap-4 rounded-md p-2 ${$page.url.pathname === link.href ? 'bg-gray-12 text-gray-1 [&_svg]:text-gray-1' : 'hover:text-gray-12'}`}
			class:active={$page.url.pathname.includes(link.href)}
		>
			<svelte:component this={link.icon} class="text-yellow-12" />
		</a>
	{/each}
	{#if $page.data.session}
		<a
			href="/profile"
			class={`flex items-center gap-4 rounded-md p-2 ${$page.url.pathname === '/profile' ? 'bg-gray-12 text-gray-1 [&_svg]:text-gray-1' : 'hover:text-gray-12'}`}
			class:active={$page.url.pathname.includes('/profile')}
		>
			<User2 class="text-yellow-12" />
		</a>
		<button
			class="flex items-center gap-4 rounded-md p-2 hover:text-gray-12"
			on:click={() => signOut()}
		>
			<LogOutIcon class="text-yellow-12" />
		</button>
	{:else}
		<button
			class="flex items-center gap-4 rounded-md hover:text-gray-12"
			on:click={() => signIn('github')}
		>
			<LogInIcon class="text-yellow-12" />
		</button>
	{/if}
</nav>
