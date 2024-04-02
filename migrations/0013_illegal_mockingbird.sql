ALTER TABLE "companies" ADD COLUMN "value" text NOT NULL;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_value_unique" UNIQUE("value");