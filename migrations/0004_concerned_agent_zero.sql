ALTER TABLE "music" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "music" ADD CONSTRAINT "music_url_unique" UNIQUE("url");