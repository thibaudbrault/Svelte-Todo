import { db, games, albums } from '$lib/db';
import { count, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	const game = await db.query.games.findFirst({
		where: eq(games.value, slug),
		with: {
			albums: true,
			companies: true,
		},
	});
	const countAlbums = await db
		.select({ count: count() })
		.from(albums)
		.where(eq(albums.gameId, game.id));
	return {
		game,
		countAlbums: countAlbums[0].count,
	};
};
