ALTER TABLE "albums" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "albums" ADD CONSTRAINT "albums_category_unique" UNIQUE("category");