ALTER TABLE "musics_to_authors" DROP CONSTRAINT "musics_to_authors_author_id_authors_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "musics_to_authors" ADD CONSTRAINT "musics_to_authors_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
