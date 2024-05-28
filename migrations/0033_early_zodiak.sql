ALTER TABLE "authors" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "authors" ADD CONSTRAINT "authors_slug_unique" UNIQUE("slug");