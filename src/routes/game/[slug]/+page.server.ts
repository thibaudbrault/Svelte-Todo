import { createAlbum, createCompany, createGame } from '$lib/actions';
import { albums, db, games } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { count, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	const game = await db.query.games.findFirst({
		where: eq(games.value, slug),
		with: {
			albums: true,
			companies: true,
		},
	});
	if (!game) {
		return redirect(300, '/');
	}
	// const allMusics = await db.select().from(musics).leftJoin(albums, eq(musics.albumId, albums.id)).leftJoin(games, eq(albums.gameId, games.id))
	const countAlbums = await db
		.select({ count: count() })
		.from(albums)
		.where(eq(albums.gameId, game.id));
	return {
		game,
		countAlbums: countAlbums[0].count,
	};
};

export const actions: Actions = {
	createAlbum,
	createGame,
	createCompany,
};
