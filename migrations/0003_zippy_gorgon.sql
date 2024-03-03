ALTER TABLE "album" ADD COLUMN "cover" text NOT NULL;--> statement-breakpoint
ALTER TABLE "album" ADD CONSTRAINT "album_cover_unique" UNIQUE("cover");