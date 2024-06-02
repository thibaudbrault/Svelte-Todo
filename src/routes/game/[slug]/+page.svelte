<script>
	import { Tabs } from 'bits-ui';
	import Header from './Header.svelte';

	const tabs = [
		{
			value: 'home',
			label: 'Home',
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

	let value = 'home';
</script>

<Header />
<Tabs.Root bind:value>
	<Tabs.List
		class="flex w-fit items-center justify-center gap-4 border-b border-b-gray-6"
	>
		{#each tabs as tab}
			<Tabs.Trigger
				value={tab.value}
				class="border-b-2 border-transparent px-2 py-1 text-base font-semibold lowercase text-gray-11 data-[state=active]:border-yellow-9 data-[state=active]:text-gray-12 md:text-xl"
				style="font-variant: small-caps;"
			>
				{tab.label}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
	<Tabs.Content value="home">
		<p>home</p>
	</Tabs.Content>
	<Tabs.Content value="albums">
		<p>albums</p>
	</Tabs.Content>
</Tabs.Root>
