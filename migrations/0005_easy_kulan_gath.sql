ALTER TABLE "albums" DROP CONSTRAINT "albums_category_unique";--> statement-breakpoint
ALTER TABLE "albums" DROP COLUMN IF EXISTS "category";