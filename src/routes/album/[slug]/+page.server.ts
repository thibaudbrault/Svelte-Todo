import { CLOUDFRONT_URL } from '$env/static/private';
import { albums, db, musics, type SelectMusic } from '$lib/db';
import { uploadFile } from '$lib/server';
import { error, fail, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const slug = params.slug;
		const response = await db
			.select()
			.from(albums)
			.where(eq(albums.slug, slug));
		if (!response) {
			error(500, 'Could not find albums');
		}
		const { id, name, cover } = response[0];
		const result: SelectMusic[] = await db
			.select()
			.from(musics)
			.where(eq(musics.albumId, id))
			.orderBy(musics.id);
		return {
			musics: result,
			name,
			cover,
		};
	} catch (err) {
		error(500, 'Unexpected error');
	}
};

export const actions: Actions = {
	createMusic: async ({ request, params }) => {
		try {
			const slug = params.slug as string;
			const album = await db
				.select({ id: albums.id })
				.from(albums)
				.where(eq(albums.slug, slug));
			const albumId = album[0].id;
			const { title, track, duration, number } = Object.fromEntries(
				await request.formData(),
			) as {
				title: string;
				track: File;
				duration: string;
				number: string;
			};
			const filename = `${slug}/${crypto.randomUUID()}${track?.name}`;
			await uploadFile(
				Buffer.from(await track.arrayBuffer()),
				filename,
				track.type,
			);
			const trackUrl = CLOUDFRONT_URL + filename;
			await db.insert(musics).values({
				title,
				url: trackUrl,
				duration: Number(duration),
				number: Number(number),
				albumId,
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create an album' });
		}
		return { status: 201 };
	},
};
