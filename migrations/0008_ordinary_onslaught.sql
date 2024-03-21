ALTER TABLE "albums" DROP CONSTRAINT "albums_game_unique";--> statement-breakpoint
ALTER TABLE "albums" DROP CONSTRAINT "albums_company_unique";--> statement-breakpoint
ALTER TABLE "albums" DROP COLUMN IF EXISTS "game";--> statement-breakpoint
ALTER TABLE "albums" DROP COLUMN IF EXISTS "company";