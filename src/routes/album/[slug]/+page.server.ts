import { albums, db, musics, type SelectMusic } from '$lib/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const slug = params.slug;
		const response = await db
			.select()
			.from(albums)
			.where(eq(albums.slug, slug));
		if (!response) {
			fail(500, { message: 'Could not find albums' });
		}
		const { id, name, cover } = response[0];
		const result: SelectMusic[] = await db
			.select()
			.from(musics)
			.where(eq(musics.albumId, id))
			.orderBy(musics.id);
		if (!result) {
			error(404, 'Musics not found');
		}
		return {
			musics: result,
			name,
			cover,
		};
	} catch (err) {
		return error(500, 'Unexpected error');
	}
};
