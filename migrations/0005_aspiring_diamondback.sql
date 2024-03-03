ALTER TABLE "album" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "album" ADD CONSTRAINT "album_slug_unique" UNIQUE("slug");