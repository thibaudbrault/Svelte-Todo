DO $$ BEGIN
 CREATE TYPE "company" AS ENUM('nintendo');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "albums" ADD COLUMN "company" "company" NOT NULL;--> statement-breakpoint
ALTER TABLE "albums" ADD CONSTRAINT "albums_company_unique" UNIQUE("company");