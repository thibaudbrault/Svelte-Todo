ALTER TABLE "albums" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "albums" ALTER COLUMN "game_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "authors" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "company_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "musics" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "musics" ALTER COLUMN "album_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "musics_to_authors" ALTER COLUMN "music_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "musics_to_authors" ALTER COLUMN "author_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "playlist_musics" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "playlist_musics" ALTER COLUMN "playlist_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "playlist_musics" ALTER COLUMN "music_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "playlists" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user_favorites_musics" ALTER COLUMN "music_id" SET DATA TYPE uuid;