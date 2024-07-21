import { db, favoritesMusics } from '$lib/db';
import { favoriteMusicSchema } from '$lib/validation';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const addFavoriteMusic = async ({ request }) => {
	const formData = await request.formData();
	const form = await superValidate(formData, zod(favoriteMusicSchema));
	if (!form.valid) {
		return fail(400, { form });
	}
	const { userId, musicId } = form.data;
	await db.insert(favoritesMusics).values({
		userId: userId,
		musicId,
	});
	return message(form, 'Favorite added successfully');
};
