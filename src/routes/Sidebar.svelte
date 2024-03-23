<script lang="ts">
	import { AddAlbum } from '$modules/forms';
	import { AudioLines, CalendarDays, Heart, ListMusic } from 'lucide-svelte';

	const links = [
		{
			name: 'Feed',
			href: '/',
			icon: AudioLines,
		},
		{
			name: 'Playlists',
			href: '/playlists',
			icon: ListMusic,
		},
		{
			name: 'Favorites',
			href: '/favorites',
			icon: Heart,
		},
		{
			name: 'History',
			href: '/history',
			icon: CalendarDays,
		},
	];
</script>

<aside class="flex flex-col gap-8 px-4 py-8 text-gray-11">
	<ul class="flex flex-col gap-4">
		{#each links as link}
			<li>
				<a href={link.href} class="flex items-center gap-4 hover:text-gray-12">
					<svelte:component this={link.icon} class="text-yellow-12" />
					<span class="font-semibold">{link.name}</span>
				</a>
			</li>
		{/each}
	</ul>
	<div class="flex flex-col gap-2">
		<p class="text-sm font-bold">Admin</p>
		<ul class="flex flex-col gap-4">
			<li>
				<AddAlbum />
			</li>
		</ul>
	</div>
</aside>
