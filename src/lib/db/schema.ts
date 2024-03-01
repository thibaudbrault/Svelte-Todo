import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const album = pgTable('album', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
});

export const albumRelations = relations(album, ({ many }) => ({
	music: many(music),
}));

export const music = pgTable('music', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	duration: text('duration').notNull(),
	albumId: serial('album_id')
		.notNull()
		.references(() => album.id, { onDelete: 'cascade' }),
});

export const postsRelations = relations(music, ({ one }) => ({
	author: one(album, { fields: [music.albumId], references: [album.id] }),
}));

export type InsertAlbum = typeof album.$inferInsert;
export type SelectAlbum = typeof album.$inferSelect;

export type InsertMusic = typeof music.$inferInsert;
export type SelectMusic = typeof music.$inferSelect;
