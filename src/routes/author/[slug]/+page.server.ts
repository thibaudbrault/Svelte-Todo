import { authors, db } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	const author = await db.query.authors.findFirst({
		where: eq(authors.slug, slug),
		with: {
			musicsToAuthors: {
				with: {
					music: true,
				},
			},
		},
	});
	if (!author) {
		return redirect(300, '/');
	}
	return {
		author,
	};
};
