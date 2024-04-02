ALTER TABLE "games" ADD COLUMN "value" text NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_value_unique" UNIQUE("value");