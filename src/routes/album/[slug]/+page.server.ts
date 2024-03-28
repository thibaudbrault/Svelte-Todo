import { albums, authors, db, games, musics, musicsToAuthors } from '$lib/db';
import { createManyMusicSchema, creatOneMusicSchema } from '$lib/validation';
import { error, fail, type Actions, redirect } from '@sveltejs/kit';
import { eq, count } from 'drizzle-orm';
import {
	message,
	setError,
	superValidate,
	withFiles,
} from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { uploadFile } from '$lib/server';
import { CLOUDFRONT_URL } from '$env/static/private';
import * as mm from 'music-metadata';
import { musicSlug } from '$lib/utils';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	const album = await db.query.albums.findFirst({
		where: eq(albums.slug, slug),
	});
	if (!album) {
		return redirect(300, '/');
	}
	const game = await db.query.games.findFirst({
		where: eq(games.id, album.gameId),
	});
	const albumLength = await db
		.select({ count: count() })
		.from(musics)
		.where(eq(musics.albumId, album.id));
	const albumMusics = await db.query.musics.findMany({
		where: eq(musics.albumId, album.id),
		orderBy: musics.number,
		with: {
			musicsToAuthors: {
				with: {
					author: true,
				},
			},
		},
	});
	return {
		album,
		game: game?.name ?? '',
		length: albumLength[0].count,
		musics: albumMusics,
		formSingle: await superValidate(zod(creatOneMusicSchema)),
		formMultiple: await superValidate(zod(createManyMusicSchema)),
	};
};

export const actions: Actions = {
	creatOneMusic: async ({ request, params }) => {
		try {
			const slug = params.slug as string;
			const album = await db.query.albums.findFirst({
				where: eq(albums.slug, slug),
			});
			if (!album) {
				return error(404, 'Could not find album');
			}
			const { id: albumId } = album;
			const formData = await request.formData();
			const form = await superValidate(formData, zod(creatOneMusicSchema), {
				id: 'createOneMusic',
			});
			if (!form.valid) {
				fail(400, { form });
			}
			const { name, track, number } = form.data;
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
				name,
				url: trackUrl,
				duration: Math.round(metadata.format?.duration ?? 0),
				number: Number(number),
				albumId,
			});
			return withFiles({ form });
		} catch (error) {
			console.error(error);
			fail(500, { message: 'Could not create an album' });
		}
	},
	createManyMusic: async ({ request, params }) => {
		const slug = params.slug as string;
		const album = await db.query.albums.findFirst({
			where: eq(albums.slug, slug),
		});
		if (!album) {
			return error(404, { message: 'Could not find album' });
		}
		const { id: albumId } = album;
		const formData = await request.formData();
		const form = await superValidate(formData, zod(createManyMusicSchema), {
			id: 'createManyMusic',
		});
		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}
		const { tracks } = form.data;
		for (const track of tracks) {
			const buffer = Buffer.from(await track.arrayBuffer());
			const metadata = await mm.parseBuffer(buffer);
			if (!metadata) {
				return setError(form, 'tracks._errors', 'Could not find metadata');
			}
			const name = metadata.common.title;
			const musicExists = await db.query.musics.findFirst({
				where: (musics, { eq, and }) =>
					and(eq(musics.name, name), eq(musics.albumId, albumId)),
			});
			if (musicExists) {
				continue;
			}
			const artists = metadata.common.artists;
			const titleSlug = musicSlug(track.name);
			const filename = `${slug}/${crypto.randomUUID()}${titleSlug}`;
			await uploadFile(buffer, filename, track.type);
			const trackUrl = CLOUDFRONT_URL + filename;
			const newMusic = await db
				.insert(musics)
				.values({
					name,
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
		}
		return message(form, 'Tracks added successfully');
	},
};
