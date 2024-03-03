<script lang="ts">
	import { Home, Search } from 'lucide-svelte';

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
</script>

<nav class="flex h-screen flex-col space-y-4 p-2">
	<div class="rounded-md bg-gray-2 px-12 py-4">
		<h1 class="pb-8 text-3xl font-semibold">SvelteKit</h1>
		<ul class="flex flex-col gap-4 text-gray-11">
			{#each topLinks as link}
				<li>
					<a
						href={link.href}
						class="flex items-center gap-4 hover:text-gray-12"
					>
						<svelte:component this={link.icon} />
						<span class="font-semibold">{link.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<ul class="h-full rounded-md bg-gray-2 px-12 py-4">
		<li>
			<a href="/library">Library</a>
		</li>
		<li>
			<a href="/favorites">Favorites</a>
		</li>
		<li>
			<a href="/profile">Profile</a>
		</li>
		<li>
			<a href="/">Sign Out</a>
		</li>
	</ul>
</nav>
