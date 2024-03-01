ALTER TABLE "music" ADD COLUMN "duration" text NOT NULL;--> statement-breakpoint
ALTER TABLE "album" ADD CONSTRAINT "album_name_unique" UNIQUE("name");