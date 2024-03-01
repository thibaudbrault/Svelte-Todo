import { db } from '$lib/db/db.server';
import { album } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const result = await db.select().from(album);
	return {
		result,
	};
};
