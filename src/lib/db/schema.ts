import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const album = pgTable('album', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	slug: text('slug').notNull().unique(),
	cover: text('cover').notNull().unique(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const albumRelations = relations(album, ({ many }) => ({
	music: many(music),
}));

export const music = pgTable('music', {
	id: serial('id').primaryKey(),
	url: text('url').notNull().unique(),
	title: text('title').notNull(),
	duration: integer('duration').notNull(),
	albumId: serial('album_id')
		.notNull()
		.references(() => album.id, { onDelete: 'cascade' }),
});

export const postsRelations = relations(music, ({ one }) => ({
	album: one(album, { fields: [music.albumId], references: [album.id] }),
}));

export type InsertAlbum = typeof album.$inferInsert;
export type SelectAlbum = typeof album.$inferSelect;

export type InsertMusic = typeof music.$inferInsert;
export type SelectMusic = typeof music.$inferSelect;
