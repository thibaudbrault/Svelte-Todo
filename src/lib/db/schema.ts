import type { AdapterAccount } from '@auth/core/adapters';
import { relations } from 'drizzle-orm';
import {
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'user']);

export const albums = pgTable('albums', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	slug: text('slug').notNull().unique(),
	cover: text('cover').notNull().unique(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	gameId: serial('game_id').notNull(),
});

export const albumsRelations = relations(albums, ({ one, many }) => ({
	games: one(games, { fields: [albums.gameId], references: [games.id] }),
	music: many(musics),
}));

export const games = pgTable('games', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	value: text('value').notNull().unique(),
	companyId: serial('company_id').notNull(),
});

export const gamesRelations = relations(games, ({ one, many }) => ({
	companies: one(companies, {
		fields: [games.companyId],
		references: [companies.id],
	}),
	albums: many(albums),
}));

export const companies = pgTable('companies', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	value: text('value').notNull().unique(),
});

export const companiesRelations = relations(companies, ({ many }) => ({
	games: many(games),
}));

export const musics = pgTable('musics', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	url: text('url').notNull().unique(),
	number: integer('number').notNull(),
	duration: integer('duration').notNull(),
	popularity: integer('popularity').default(0),
	popularityUpdatedAt: timestamp('popularity_updated_at')
		.defaultNow()
		.notNull(),
	albumId: serial('album_id')
		.notNull()
		.references(() => albums.id, { onDelete: 'cascade' }),
});

export const musicsRelations = relations(musics, ({ one, many }) => ({
	album: one(albums, { fields: [musics.albumId], references: [albums.id] }),
	musicsToAuthors: many(musicsToAuthors),
}));

export const authors = pgTable('authors', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
});

export const authorsRelations = relations(authors, ({ many }) => ({
	musicsToAuthors: many(musicsToAuthors),
}));

export const musicsToAuthors = pgTable(
	'musics_to_authors',
	{
		musicId: integer('music_id')
			.notNull()
			.references(() => musics.id),
		authorId: integer('author_id')
			.notNull()
			.references(() => authors.id),
	},
	(t) => ({
		pk: primaryKey(t.musicId, t.authorId),
	}),
);

export const musicToAuthorRelations = relations(musicsToAuthors, ({ one }) => ({
	music: one(musics, {
		fields: [musicsToAuthors.musicId],
		references: [musics.id],
	}),
	author: one(authors, {
		fields: [musicsToAuthors.authorId],
		references: [authors.id],
	}),
}));

export const users = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	role: roleEnum('role').default('user'),
});

export const playlists = pgTable('playlists', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
});

export const playlistMusics = pgTable('playlist_musics', {
	id: serial('id').primaryKey(),
	playlistId: integer('playlist_id')
		.notNull()
		.references(() => playlists.id),
	musicId: integer('music_id')
		.notNull()
		.references(() => musics.id),
});

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);

export type InsertAlbum = typeof albums.$inferInsert;
export type SelectAlbum = typeof albums.$inferSelect;

export type InsertMusic = typeof musics.$inferInsert;
export type SelectMusic = typeof musics.$inferSelect;

export type InsertAuthor = typeof authors.$inferInsert;
export type SelectAuthor = typeof authors.$inferSelect;

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
