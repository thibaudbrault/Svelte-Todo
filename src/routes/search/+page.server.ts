import { createAlbum, createGame, createCompany } from '$lib/actions';
import { db } from '$lib/db';
import type { AlbumsWithGames } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allAlbums: AlbumsWithGames[] = await db.query.albums.findMany({
		with: {
			games: true,
		},
	});
	return {
		albums: allAlbums,
	};
};

export const actions: Actions = {
	createAlbum,
	createGame,
	createCompany,
};
