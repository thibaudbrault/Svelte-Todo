ALTER TABLE "musics" ADD COLUMN "popularity" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "musics" ADD COLUMN "popularity_updated_at" timestamp DEFAULT now() NOT NULL;