<script lang="ts">
	import { Home, Search } from 'lucide-svelte';
</script>

<nav class="flex h-screen flex-col space-y-4 bg-neutral-900 p-2">
	<div class="rounded-md bg-neutral-800 px-12 py-4">
		<h1 class="pb-8 text-3xl font-semibold">SvelteKit</h1>
		<ul class="flex flex-col gap-4 text-neutral-100/80">
			<li>
				<a href="/" class="flex items-center gap-4 hover:text-neutral-100"
					><Home /> <span class="font-semibold">Home</span></a
				>
			</li>
			<li>
				<a href="/" class="flex items-center gap-4 hover:text-neutral-100"
					><Search /> <span class="font-semibold">Search</span></a
				>
			</li>
		</ul>
	</div>
	<ul class="h-full rounded-md bg-neutral-800 px-12 py-4">
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
