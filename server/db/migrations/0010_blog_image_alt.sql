ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "featured_image_alt" text NOT NULL DEFAULT '';
--> statement-breakpoint
UPDATE "blog_posts" SET "featured_image_alt" = "title" WHERE "featured_image_alt" = '';
