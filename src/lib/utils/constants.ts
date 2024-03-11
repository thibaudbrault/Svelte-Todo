import { Heart, Home, Library, Search } from 'lucide-svelte';

export const topLinks = [
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

export const middleLinks = [
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
