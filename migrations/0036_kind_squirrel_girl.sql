ALTER TABLE "user_favorites_albums" RENAME TO "favorites_albums";--> statement-breakpoint
ALTER TABLE "user_favorites_musics" RENAME TO "favorites_musics";--> statement-breakpoint
ALTER TABLE "musics_to_authors" RENAME TO "musics_authors";--> statement-breakpoint
ALTER TABLE "musics" DROP CONSTRAINT "musics_album_id_albums_id_fk";
--> statement-breakpoint
ALTER TABLE "playlists" DROP CONSTRAINT "playlists_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "albums" ADD COLUMN "updated_at" timestamp (3);--> statement-breakpoint
ALTER TABLE "authors" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "authors" ADD COLUMN "updated_at" timestamp (3) NOT NULL;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "updated_at" timestamp (3) NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "updated_at" timestamp (3) NOT NULL;--> statement-breakpoint
ALTER TABLE "musics" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "musics" ADD COLUMN "updated_at" timestamp (3);--> statement-breakpoint
ALTER TABLE "playlists" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "playlists" ADD COLUMN "updated_at" timestamp (3) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp (3);