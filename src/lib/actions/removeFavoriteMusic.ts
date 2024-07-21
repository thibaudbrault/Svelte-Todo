import { db, favoritesMusics } from '$lib/db';
import { favoriteMusicSchema } from '$lib/validation';
import { fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const removeFavoriteMusic = async ({ request }) => {
	const formData = await request.formData();
	const form = await superValidate(formData, zod(favoriteMusicSchema));
	if (!form.valid) {
		return fail(400, { form });
	}
	const { userId, musicId } = form.data;
	await db
		.delete(favoritesMusics)
		.where(
			and(
				eq(favoritesMusics.userId, userId),
				eq(favoritesMusics.musicId, musicId),
			),
		);
	return message(form, 'Favorite removed successfully');
};
