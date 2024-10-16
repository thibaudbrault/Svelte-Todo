import { dev } from '$app/environment';
import { PUBLIC_SITE_URL } from '$env/static/public';
import { createAlbum, createGame, createCompany } from '$lib/actions';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	createAlbum,
	createGame,
	createCompany,
	login: async ({ locals: { supabase } }) => {
		const getURL = () => {
			let url = '';
			if (dev) {
				url = 'http://localhost:5173/';
			} else {
				url = PUBLIC_SITE_URL;
			}
			url = url.startsWith('http') ? url : `https://${url}`;
			url = url.endsWith('/') ? url : `${url}/`;
			return url;
		};
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${getURL()}auth/callback`,
			},
		});
		if (error) {
			console.error(error);
			return redirect(303, '/auth/error');
		}
		if (data.url) {
			return redirect(302, data.url);
		}
	},
};
