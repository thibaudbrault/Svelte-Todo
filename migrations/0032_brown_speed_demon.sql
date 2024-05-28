ALTER TABLE "playlists" ADD COLUMN "value" text NOT NULL;--> statement-breakpoint
ALTER TABLE "playlists" ADD CONSTRAINT "playlists_value_unique" UNIQUE("value");