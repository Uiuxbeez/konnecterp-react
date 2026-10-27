import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { blogMediaUrl, normalizeBlogMedia } from './blog-media';
import files from './blog-media-manifest.json';

test('every mapped WordPress file exists in deployable public assets', () => {
  for (const file of files) assert.ok(fs.statSync(`public/blog-media/${file}`).size > 0, file);
});
test('localhost images become portable URLs while external and unmapped URLs are preserved', () => {
  const source = 'http://localhost/workfiles/konnect/wp-content/uploads/2026/01/ERP-System.jpg';
  assert.equal(blogMediaUrl(source), '/blog-media/2026/01/ERP-System.jpg');
  assert.equal(blogMediaUrl(source + '?v=1#image'), '/blog-media/2026/01/ERP-System.jpg?v=1#image');
  assert.equal(blogMediaUrl(source.replace('localhost', 'example.com')), source.replace('localhost', 'example.com'));
  assert.equal(blogMediaUrl('http://localhost/wp-content/uploads/missing.jpg'), 'http://localhost/wp-content/uploads/missing.jpg');
  const post = normalizeBlogMedia({ featuredImage: source, content: `<a href="${source}"><img src="${source}"></a>` });
  assert.ok(!post.content.includes('localhost'));
  assert.equal(normalizeBlogMedia(post).content, post.content);
});
