import { db, games, albums } from '$lib/db';
import { count, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { createAlbum, createCompany, createGame } from '$lib/actions';
import { redirect } from '@sveltejs/kit';

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
