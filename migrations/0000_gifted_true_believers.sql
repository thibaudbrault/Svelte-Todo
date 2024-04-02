CREATE TABLE IF NOT EXISTS "albums" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"cover" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "albums_name_unique" UNIQUE("name"),
	CONSTRAINT "albums_slug_unique" UNIQUE("slug"),
	CONSTRAINT "albums_cover_unique" UNIQUE("cover")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "authors_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "musics" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"duration" integer NOT NULL,
	"album_id" serial NOT NULL,
	CONSTRAINT "musics_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "musics_to_authors" (
	"music_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	CONSTRAINT "musics_to_authors_music_id_author_id_pk" PRIMARY KEY("music_id","author_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "musics" ADD CONSTRAINT "musics_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "musics_to_authors" ADD CONSTRAINT "musics_to_authors_music_id_musics_id_fk" FOREIGN KEY ("music_id") REFERENCES "musics"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "musics_to_authors" ADD CONSTRAINT "musics_to_authors_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
