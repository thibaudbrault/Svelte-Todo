/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'selector',
	theme: {
		extend: {
			fontFamily: {
				sans: ["'Inter'", 'sans-serif'],
			},
			boxShadow: {
				sm: '0 0 0 1px',
			},
			colors: {
				gray: {
					1: 'var(--gray-1)',
					2: 'var(--gray-2)',
					3: 'var(--gray-3)',
					4: 'var(--gray-4)',
					5: 'var(--gray-5)',
					6: 'var(--gray-6)',
					7: 'var(--gray-7)',
					8: 'var(--gray-8)',
					9: 'var(--gray-9)',
					10: 'var(--gray-10)',
					11: 'var(--gray-11)',
					12: 'var(--gray-12)',
				},
				grayA: {
					1: 'var(--gray-a1)',
					2: 'var(--gray-a2)',
					3: 'var(--gray-a3)',
					4: 'var(--gray-a4)',
					5: 'var(--gray-a5)',
					6: 'var(--gray-a6)',
					7: 'var(--gray-a7)',
					8: 'var(--gray-a8)',
					9: 'var(--gray-a9)',
					10: 'var(--gray-a10)',
					11: 'var(--gray-a11)',
					12: 'var(--gray-a12)',
				},
				yellow: {
					1: 'var(--yellow-1)',
					2: 'var(--yellow-2)',
					3: 'var(--yellow-3)',
					4: 'var(--yellow-4)',
					5: 'var(--yellow-5)',
					6: 'var(--yellow-6)',
					7: 'var(--yellow-7)',
					8: 'var(--yellow-8)',
					9: 'var(--yellow-9)',
					10: 'var(--yellow-10)',
					11: 'var(--yellow-11)',
					12: 'var(--yellow-12)',
					surface: '#231f1380',
				},
				yellowA: {
					1: 'var(--yellow-a1)',
					2: 'var(--yellow-a2)',
					3: 'var(--yellow-a3)',
					4: 'var(--yellow-a4)',
					5: 'var(--yellow-a5)',
					6: 'var(--yellow-a6)',
					7: 'var(--yellow-a7)',
					8: 'var(--yellow-a8)',
					9: 'var(--yellow-a9)',
					10: 'var(--yellow-a10)',
					11: 'var(--yellow-a11)',
					12: 'var(--yellow-a12)',
				},
				red: {
					1: 'var(--red-1)',
					2: 'var(--red-2)',
					3: 'var(--red-3)',
					4: 'var(--red-4)',
					5: 'var(--red-5)',
					6: 'var(--red-6)',
					7: 'var(--red-7)',
					8: 'var(--red-8)',
					9: 'var(--red-9)',
					10: 'var(--red-10)',
					11: 'var(--red-11)',
					12: 'var(--red-12)',
					surface: '#2f151780',
				},
				redA: {
					1: 'var(--red-a1)',
					2: 'var(--red-a2)',
					3: 'var(--red-a3)',
					4: 'var(--red-a4)',
					5: 'var(--red-a5)',
					6: 'var(--red-a6)',
					7: 'var(--red-a7)',
					8: 'var(--red-a8)',
					9: 'var(--red-a9)',
					10: 'var(--red-a10)',
					11: 'var(--red-a11)',
					12: 'var(--red-a12)',
				},
			},
			animation: {
				'spin-slow': 'spin 3s linear infinite',
			},
		},
	},
	plugins: [],
};
