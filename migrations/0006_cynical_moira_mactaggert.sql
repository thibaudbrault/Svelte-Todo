DO $$ BEGIN
 CREATE TYPE "game" AS ENUM('pokemon');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "albums" ADD COLUMN "game" "game" NOT NULL;--> statement-breakpoint
ALTER TABLE "albums" ADD CONSTRAINT "albums_game_unique" UNIQUE("game");