import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allAlbums = await db.query.albums.findMany();
	return {
		albums: allAlbums,
	};
};
