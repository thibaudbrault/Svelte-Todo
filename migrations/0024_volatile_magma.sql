CREATE TABLE IF NOT EXISTS "user_favorites_albums" (
	"user_id" text NOT NULL,
	"album_id" uuid NOT NULL,
	CONSTRAINT "user_favorites_albums_user_id_album_id_pk" PRIMARY KEY("user_id","album_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_favorites_albums" ADD CONSTRAINT "user_favorites_albums_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_favorites_albums" ADD CONSTRAINT "user_favorites_albums_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
