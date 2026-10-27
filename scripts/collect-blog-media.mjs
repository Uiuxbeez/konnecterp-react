import 'dotenv/config';
import pg from 'pg';
import fs from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.resolve(process.argv[2] || 'C:/xampp/htdocs/workfiles/konnect/wp-content/uploads');
const destinationRoot = path.resolve('public/blog-media');
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
try {
  const { rows } = await pool.query('select featured_image, content from blog_posts');
  const paths = new Set();
  for (const row of rows) {
    for (const value of Object.values(row)) {
      for (const match of String(value).matchAll(/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/[^\s"'<>]+/gi)) {
        const url = new URL(match[0]);
        const marker = '/wp-content/uploads/';
        if (url.pathname.includes(marker)) paths.add(decodeURIComponent(url.pathname.split(marker)[1]));
      }
    }
  }
  const copied = [];
  const missing = [];
  for (const relative of [...paths].sort()) {
    const source = path.resolve(sourceRoot, relative);
    const target = path.resolve(destinationRoot, relative);
    if (!source.startsWith(sourceRoot + path.sep) || !target.startsWith(destinationRoot + path.sep) || !/\.(jpe?g|png|webp|gif|avif)$/i.test(relative)) continue;
    try {
      await fs.access(source);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.copyFile(source, target);
      copied.push(relative);
    } catch { missing.push(relative); }
  }
  await fs.writeFile('shared/blog-media-manifest.json', JSON.stringify(copied, null, 2) + '\n');
  console.log(JSON.stringify({ posts: rows.length, copied: copied.length, missing }, null, 2));
} finally { await pool.end(); }
