import { db, album } from '$lib/db';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	const result = await db.select().from(album);
	return {
		result,
	};
};
