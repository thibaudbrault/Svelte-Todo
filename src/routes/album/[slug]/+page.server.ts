import { albums, authors, db, musics, musicsToAuthors } from '$lib/db';
import {
	createMultipleMusicSchema,
	createSingleMusicSchema,
} from '$lib/validation';
import { error, fail, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { uploadFile } from '$lib/server';
import { CLOUDFRONT_URL } from '$env/static/private';
import * as mm from 'music-metadata';
import { musicSlug } from '$lib/utils';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const formSingle = await superValidate(zod(createSingleMusicSchema));
		const formMultiple = await superValidate(zod(createMultipleMusicSchema));
		const slug = params.slug;
		const album = await db.query.albums.findFirst({
			where: eq(albums.slug, slug),
		});
		if (!album) {
			error(500, 'Could not find album');
		}
		const allMusics = await db.query.musics.findMany({
			where: eq(musics.albumId, album.id),
			orderBy: musics.number,
		});
		// const allMusics: SelectMusic[] = await db
		// 	.select()
		// 	.where(eq(musics.albumId, id))
		// 	.orderBy(musics.number);
		// 	.from(musics)
		return {
			musics: allMusics,
			album,
			formSingle,
			formMultiple,
		};
	} catch (err) {
		error(500, 'Unexpected error');
	}
};

export const actions: Actions = {
	createSingleMusic: async ({ request, params }) => {
		try {
			const slug = params.slug as string;
			const album = await db.query.albums.findFirst({
				where: eq(albums.slug, slug),
			});
			if (!album) {
				error(500, 'Could not find album');
			}
			const { id: albumId } = album;
			const formData = await request.formData();
			const form = await superValidate(formData, zod(createSingleMusicSchema));
			if (!form.valid) {
				return fail(400, { form });
			}
			const { title, track, number } = form.data;
			const filename = `${slug}/${crypto.randomUUID()}${track?.name}`;
			const buffer = Buffer.from(await track.arrayBuffer());
			const metadata = await mm.parseBuffer(buffer);
			await uploadFile(
				Buffer.from(await track.arrayBuffer()),
				filename,
				track.type,
			);
			const trackUrl = CLOUDFRONT_URL + filename;
			await db.insert(musics).values({
				title,
				url: trackUrl,
				duration: Math.round(metadata.format?.duration ?? 0),
				number: Number(number),
				albumId,
			});
			return withFiles({ form });
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create an album' });
		}
	},
	createMultipleMusic: async ({ request, params }) => {
		try {
			const slug = params.slug as string;
			const album = await db.query.albums.findFirst({
				where: eq(albums.slug, slug),
			});
			if (!album) {
				error(500, 'Could not find album');
			}
			const { id: albumId } = album;
			const formData = await request.formData();
			const form = await superValidate(
				formData,
				zod(createMultipleMusicSchema),
			);
			if (!form.valid) {
				return fail(400, { form });
			}
			const { tracks } = form.data;
			tracks.forEach(async (track) => {
				const buffer = Buffer.from(await track.arrayBuffer());
				const metadata = await mm.parseBuffer(buffer);
				const artists = metadata.common.artists;
				const titleSlug = musicSlug(track.name);
				const filename = `${titleSlug}/${crypto.randomUUID()}${track.name}`;
				await uploadFile(buffer, filename, track.type);
				const trackUrl = CLOUDFRONT_URL + filename;
				const newMusic = await db
					.insert(musics)
					.values({
						title: metadata.common.title,
						url: trackUrl,
						duration: Math.round(metadata.format?.duration ?? 0),
						number: metadata.common.track.no,
						albumId,
					})
					.returning({ musicId: musics.id });
				const musicId = newMusic[0].musicId;
				let authorId;
				artists?.forEach(async (artist) => {
					const artistExists = await db.query.authors.findFirst({
						where: eq(authors.name, artist),
					});
					if (!artistExists) {
						const newAuthor = await db
							.insert(authors)
							.values({
								name: artist,
							})
							.returning({ authorId: authors.id });
						authorId = newAuthor[0].authorId;
					} else {
						authorId = artistExists.id;
					}
					await db.insert(musicsToAuthors).values({
						musicId,
						authorId,
					});
				});
			});
			return withFiles({ form });
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create an album' });
		}
	},
};
