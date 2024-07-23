import { albums, db, favoritesAlbums } from '$lib/db';
import { favoriteAlbumSchema } from '$lib/validation';
import { fail } from '@sveltejs/kit';
import { and, eq, sql } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const updateFavoriteAlbum = async ({
	request,
}: {
	request: Request;
}) => {
	const formData = await request.formData();
	const form = await superValidate(formData, zod(favoriteAlbumSchema));
	if (!form.valid) {
		return fail(400, { form });
	}
	const { userId, albumId, action } = form.data;
	if (action === 'add') {
		await db.insert(favoritesAlbums).values({
			userId: userId,
			albumId,
		});
		await db
			.update(albums)
			.set({ popularity: sql<number>`popularity + 1` })
			.where(eq(albums.id, albumId));
		return message(form, 'Favorite added successfully');
	} else if (action === 'remove') {
		await db
			.delete(favoritesAlbums)
			.where(
				and(
					eq(favoritesAlbums.userId, userId),
					eq(favoritesAlbums.albumId, albumId),
				),
			);
		await db
			.update(albums)
			.set({ popularity: sql<number>`popularity - 1` })
			.where(eq(albums.id, albumId));
		return message(form, 'Favorite removed successfully');
	}
};
