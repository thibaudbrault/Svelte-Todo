import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { albumSlug } from '$lib/utils';
import { db, albums } from '$lib/db';
import { CLOUDFRONT_URL } from '$env/static/private';
import { uploadFile } from '$lib/server';

export const load: PageServerLoad = async () => {
	const result = await db.select().from(albums);
	return {
		result,
	};
};

export const actions: Actions = {
	createAlbum: async ({ request }) => {
		const { name, gameId, cover } = Object.fromEntries(
			await request.formData(),
		) as {
			name: string;
			gameId: number;
			cover: File;
		};
		const slug = albumSlug(name);
		const filename = `${slug}/${crypto.randomUUID()}${cover?.name}`;
		try {
			await uploadFile(
				Buffer.from(await cover.arrayBuffer()),
				filename,
				cover.type,
			);
			const coverUrl = CLOUDFRONT_URL + filename;
			await db.insert(albums).values({
				name,
				cover: coverUrl,
				slug,
				gameId,
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create an album' });
		}
		return { status: 201 };
	},
};
