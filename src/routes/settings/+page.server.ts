import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db, users } from '$lib/db';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, 'auth/signin');
	const user = await db.query.users.findFirst({
		where: eq(users.email, session.user.email),
	});
	if (user?.role !== 'admin') throw redirect(303, '/');
};
