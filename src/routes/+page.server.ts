import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { slugWithOptions, uploadFile } from '$lib/utils';
import { db, albums } from '$lib/db';
import { CLOUDFRONT_URL } from '$env/static/private';

export const load: PageServerLoad = async () => {
	const result = await db.select().from(albums);
	return {
		result,
	};
};

export const actions: Actions = {
	createAlbum: async ({ request }) => {
		const { name, cover } = Object.fromEntries(await request.formData()) as {
			name: string;
			cover: File;
		};
		const filename = `${name}/${crypto.randomUUID()}${cover?.name}`;
		try {
			await uploadFile(
				Buffer.from(await cover.arrayBuffer()),
				filename,
				cover.type,
			);
			const slug = slugWithOptions(name);
			const coverUrl = CLOUDFRONT_URL + filename;
			await db.insert(albums).values({
				name,
				cover: coverUrl,
				slug,
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create an album' });
		}
		return { status: 201 };
	},
};
