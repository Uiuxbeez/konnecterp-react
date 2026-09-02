ALTER TABLE "forms" ADD COLUMN IF NOT EXISTS "email_recipient" text DEFAULT 'sales@konnectbi.com' NOT NULL;
--> statement-breakpoint
UPDATE "forms"
SET "email_recipient" = 'hr@konnectbi.com'
WHERE lower("slug") LIKE '%career%'
   OR lower("slug") LIKE '%job%'
   OR lower("name") LIKE '%career%'
   OR lower("name") LIKE '%job%'
   OR lower("title") LIKE '%career%'
   OR lower("title") LIKE '%job%';
