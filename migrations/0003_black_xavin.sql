DO $$ BEGIN
 CREATE TYPE "category" AS ENUM('pokemon');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "albums" ADD COLUMN "category" "category";