<script lang="ts">
	import { page } from '$app/stores';
	import { AddAlbum, AddCompany, AddGame } from '$modules/forms';
	import { AudioLines, CalendarDays, LibraryBig } from 'lucide-svelte';

	const links = [
		{
			name: 'Feed',
			href: '/',
			icon: AudioLines,
		},
		{
			name: 'Library',
			href: '/library',
			icon: LibraryBig,
		},
		{
			name: 'History',
			href: '/history',
			icon: CalendarDays,
		},
	];
</script>

<aside class="grid grid-rows-[80px_1fr] gap-8 px-4 py-8 text-gray-11">
	<h1 class="text-3xl font-bold text-gray-12">PokeMusic</h1>
	<ul class="flex flex-col gap-4">
		{#each links as link}
			<li>
				<a
					href={link.href}
					class={`flex items-center gap-4 rounded-md p-2 ${$page.url.pathname === link.href ? 'bg-gray-12 text-gray-1 [&_svg]:text-gray-1' : 'hover:text-gray-12'}`}
					class:active={$page.url.pathname.includes(link.href)}
				>
					<svelte:component this={link.icon} class="text-yellow-12" />
					<span class="font-semibold">{link.name}</span>
				</a>
			</li>
		{/each}
	</ul>
	{#if $page.data.user && $page.data.user.role === 'admin'}
		<div class="flex flex-col gap-2">
			<p class="text-sm font-bold">Admin</p>
			<ul class="flex flex-col gap-4">
				<li>
					<AddAlbum />
				</li>
				<li>
					<AddGame />
				</li>
				<li>
					<AddCompany />
				</li>
			</ul>
		</div>
	{/if}
</aside>
