import { albums, db, musics } from '$lib/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	const response = await db.select().from(albums).where(eq(albums.slug, slug));
	const { id, name, cover } = response[0];
	const result = await db
		.select()
		.from(musics)
		.where(eq(musics.albumId, id))
		.orderBy(musics.id);
	return {
		result,
		name,
		cover,
	};
};
