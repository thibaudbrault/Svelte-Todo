ALTER TABLE "musics_to_authors" DROP CONSTRAINT "musics_to_authors_music_id_musics_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "musics_to_authors" ADD CONSTRAINT "musics_to_authors_music_id_musics_id_fk" FOREIGN KEY ("music_id") REFERENCES "musics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
