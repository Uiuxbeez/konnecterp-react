UPDATE "sections"
SET "content" = jsonb_set(
  "content",
  '{jobs}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN lower(coalesce(job->>'applyHref', '')) LIKE 'mailto:%' OR NOT (job ? 'applyAction')
          THEN job || '{"applyAction":"custom_form_modal","applyHref":""}'::jsonb
        ELSE job
      END
      ORDER BY ordinality
    )
    FROM jsonb_array_elements("content"->'jobs') WITH ORDINALITY AS jobs(job, ordinality)
  )
)
WHERE "type" = 'career_roles'
  AND jsonb_typeof("content"->'jobs') = 'array';
--> statement-breakpoint
UPDATE "sections"
SET "publishedContent" = jsonb_set(
  "publishedContent",
  '{jobs}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN lower(coalesce(job->>'applyHref', '')) LIKE 'mailto:%' OR NOT (job ? 'applyAction')
          THEN job || '{"applyAction":"custom_form_modal","applyHref":""}'::jsonb
        ELSE job
      END
      ORDER BY ordinality
    )
    FROM jsonb_array_elements("publishedContent"->'jobs') WITH ORDINALITY AS jobs(job, ordinality)
  )
)
WHERE "type" = 'career_roles'
  AND jsonb_typeof("publishedContent"->'jobs') = 'array';
