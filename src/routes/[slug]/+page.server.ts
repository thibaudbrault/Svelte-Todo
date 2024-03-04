import { albums, db, musics } from '$lib/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	const response = await db.select().from(albums).where(eq(albums.slug, slug));
	if (!response) {
		return fail(500, { message: 'Could not find albums' });
	}
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
