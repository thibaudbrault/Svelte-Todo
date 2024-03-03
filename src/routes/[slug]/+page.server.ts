import { album, db, music } from '$lib/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	const response = await db.select().from(album).where(eq(album.slug, slug));
	const { id, name, cover } = response[0];
	const result = await db
		.select()
		.from(music)
		.where(eq(music.albumId, id))
		.orderBy(music.id);
	return {
		result,
		name,
		cover,
	};
};
