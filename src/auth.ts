import { SvelteKitAuth } from '@auth/sveltekit';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import google from '@auth/sveltekit/providers/google';
import { db, playlists, users } from '$lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
	],
	trustHost: true,
	adapter: DrizzleAdapter(db),
	callbacks: {
		async signIn({ user }) {
			const userId = user.id;
			if (!userId) {
				return false;
			}
			const userExists = await db.query.users.findFirst({
				where: eq(users.id, userId),
			});
			if (!userExists) {
				await db
					.insert(playlists)
					.values({
						name: 'liked songs',
						userId,
					})
					.execute();
			}
			return true;
		},
	},
});
