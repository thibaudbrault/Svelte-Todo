import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { slugWithOptions } from '$lib/utils';
import { db, albums } from '$lib/db';

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
			cover: string;
		};
		try {
			const slug = slugWithOptions(name);
			await db.insert(albums).values({
				name,
				cover,
				slug,
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create an album' });
		}
		return { status: 201 };
	},
};
