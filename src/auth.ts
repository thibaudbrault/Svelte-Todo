import { SvelteKitAuth } from '@auth/sveltekit';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import google from '@auth/sveltekit/providers/google';
import { db } from '$lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
	],
	adapter: DrizzleAdapter(db),
	trustHost: true,
});
