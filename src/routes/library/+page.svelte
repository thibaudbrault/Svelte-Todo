<script lang="ts">
	import { Tabs } from 'bits-ui';

	const tabs = [
		{
			value: 'playlists',
			label: 'Playlists',
		},
		{
			value: 'albums',
			label: 'Albums',
		},
		{
			value: 'artists',
			label: 'Artists',
		},
	];
</script>

<Tabs.Root value="playlists" class="space-y-4">
	<div class="flex items-center gap-4">
		<h2 class="text-4xl font-bold">Library</h2>
		<Tabs.List
			class="mx-auto flex w-fit items-center justify-center gap-4 rounded-md bg-gray-12 px-4 py-2 text-gray-1"
		>
			{#each tabs as tab}
				<Tabs.Trigger
					value={tab.value}
					class="rounded-md px-2 py-1 text-xl font-semibold lowercase data-[state=active]:bg-gray-3 data-[state=active]:text-gray-12"
					style="font-variant: small-caps;"
				>
					{tab.label}
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
	</div>
	<Tabs.Content value="playlists">
		<p>playlists</p>
	</Tabs.Content>
	<Tabs.Content value="albums">
		<p>albums</p>
	</Tabs.Content>
	<Tabs.Content value="artists">
		<p>artists</p>
	</Tabs.Content>
</Tabs.Root>
