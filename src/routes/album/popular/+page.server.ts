import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const popularAlbums = await db.query.albums.findMany({
		orderBy: (albums, { desc }) => [desc(albums.popularity)],
		with: {
			games: true,
		},
	});
	return {
		popularAlbums,
	};
};
