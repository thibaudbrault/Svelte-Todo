CREATE TABLE IF NOT EXISTS "album" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "music" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"album_id" serial NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "music" ADD CONSTRAINT "music_album_id_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
