CREATE TABLE "site_navigation" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"menu" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "site_navigation_key_idx" ON "site_navigation" USING btree ("key");
