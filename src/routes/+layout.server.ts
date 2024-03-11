import { createAlbumSchema } from '$lib/validation';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';

export const load: LayoutServerLoad = async (event) => {
	const form = await superValidate(zod(createAlbumSchema));
	return {
		form,
		session: await event.locals.auth(),
	};
};
