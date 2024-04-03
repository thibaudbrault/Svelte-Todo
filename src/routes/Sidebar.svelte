<script lang="ts">
	import { page } from '$app/stores';
	import { AddAlbum, AddCompany, AddGame } from '$modules/forms';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import {
		AudioLines,
		LibraryBig,
		LogInIcon,
		LogOutIcon,
		Menu,
		SearchIcon,
		User2,
		XIcon,
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

	let menuIsOpen: boolean = false;
</script>

<aside class="hidden flex-col gap-8 p-4 text-gray-11 md:flex">
	<h1 class="text-3xl font-bold text-gray-12">PokeMusic</h1>
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
				<AddAlbum />
				<AddGame />
				<AddCompany />
			</div>
		</div>
	{/if}
</aside>

<button
	class="absolute left-6 top-6 block md:hidden"
	on:click={() => (menuIsOpen = true)}
>
	<Menu />
</button>
{#if menuIsOpen}
	<nav class="absolute inset-0 z-10 h-screen w-screen bg-gray-1 text-gray-12">
		<div class="flex h-full flex-col items-center justify-center gap-4">
			{#each links as link}
				<a
					href={link.href}
					on:click={() => (menuIsOpen = false)}
					class="text-6xl font-semibold"
				>
					{link.name}
				</a>
			{/each}
			{#if $page.data.session}
				<a
					href="/profile"
					on:click={() => (menuIsOpen = false)}
					class="text-6xl font-semibold"
				>
					Profile
				</a>
			{/if}
		</div>
		<button
			class="absolute left-6 top-6 block md:hidden"
			on:click={() => (menuIsOpen = false)}
		>
			<XIcon />
		</button>
	</nav>
{/if}
